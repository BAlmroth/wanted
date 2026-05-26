import { useState, useRef, useEffect } from "react";
import { LEVELS } from "../../data/Levels";
import {
  generateLevel,
  validateClick,
  resolveFigure,
} from "../../utils/gameUtils";
import { saveScore } from "../../utils/leaderboard";
import { useCentralbank } from "../../hooks/useCentralbank";
import { TIVOLI_MODE } from "../../config";
import { useSound } from "../../contexts/SoundContext";
import type { ApiError } from "../../types/CentralBank";
import type { GamePhase, UseGameLogicReturn } from "../../types/Game";
import type { GridCharacter } from "../../types/Character";

const INITIAL_TIME = 10;

export function useGameLogic(): UseGameLogicReturn {
  const [gameState, setGameState] = useState<GamePhase>("idle");
  const [levelIndex, setLevelIndex] = useState(0);
  const [targetFigure, setTargetFigure] = useState("");
  const [characters, setCharacters] = useState<GridCharacter[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [loading, setLoading] = useState(false);
  const [isWin, setIsWin] = useState(false);
  const gameEndedRef = useRef(false);
  const [timerRunning, setTimerRunning] = useState(false);
  const timeLeftRef = useRef(INITIAL_TIME);
  const scoreRef = useRef(0);
  const introTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const {
    startGame: startCentralbankGame,
    endGame,
    transaction,
    error,
    clearError,
    user,
  } = useCentralbank();

  const { play } = useSound();

  function resetToIdle(): void {
    clearError();
    if (introTimeoutRef.current) {
      //timerlogic needed in this file to minimize cheating
      clearTimeout(introTimeoutRef.current);
      introTimeoutRef.current = null;
    }
    setGameState("idle");
    setCharacters([]);
    setTargetFigure("");
    setScore(0);
    setLevelIndex(0);
    setTimerRunning(false);
    timeLeftRef.current = INITIAL_TIME;
    setTimeLeft(INITIAL_TIME);
    setIsWin(false);
  }

  useEffect((): void | (() => void) => {
    if (gameState !== "playing") {
      return;
    }

    if (introTimeoutRef.current) {
      clearTimeout(introTimeoutRef.current);
    }

    setTimerRunning(false);
    introTimeoutRef.current = setTimeout((): void => {
      setTimerRunning(true);
      introTimeoutRef.current = null;
    }, 2800);

    return () => {
      if (introTimeoutRef.current) {
        clearTimeout(introTimeoutRef.current);
        introTimeoutRef.current = null;
      }
    };
  }, [gameState]);

  useEffect((): void => {
    scoreRef.current = score;
  }, [score]);

  useEffect((): void | (() => void) => {
    if (gameState !== "playing" || gameEndedRef.current || !timerRunning) {
      return;
    }

    const interval = setInterval((): void => {
      timeLeftRef.current -= 1;
      setTimeLeft(timeLeftRef.current);

      if (timeLeftRef.current <= 0) {
        clearInterval(interval);
        void handleTimeUp();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState, timerRunning]);

  const currentLevel = LEVELS[levelIndex];

  async function loadLevel(index: number): Promise<void> {
    setLoading(true);
    setMessage("");
    try {
      const data = await generateLevel(LEVELS[index].gridCount);
      setSessionId(data.sessionId);
      setTargetFigure(resolveFigure(data.targetFigure));
      setCharacters(
        data.grid.map((character: GridCharacter) => ({
          ...character,
          figure: resolveFigure(character.figure),
        })),
      );
    } catch (err) {
      const apiError = err as ApiError;
      console.error("Failed to load level:", apiError.message);
      setMessage("Failed to load level. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function startGame(): Promise<void> {
    setScore(0);
    setLevelIndex(0);
    setMessage("");
    setTimerRunning(false);
    timeLeftRef.current = INITIAL_TIME;
    setTimeLeft(INITIAL_TIME);
    gameEndedRef.current = false;

    if (introTimeoutRef.current) {
      clearTimeout(introTimeoutRef.current);
      introTimeoutRef.current = null;
    }

    try {
      await startCentralbankGame();
    } catch (err) {
      console.warn(
        "[Game] Failed to start centralbank game:",
        err instanceof Error ? err.message : String(err),
      );
      return;
    }

    await loadLevel(0);
    setGameState("playing");
  }

  async function handleClick(character: GridCharacter): Promise<void> {
    if (
      gameState !== "playing" ||
      !sessionId ||
      loading ||
      gameEndedRef.current
    )
      return;

    let correct: boolean;

    if (!TIVOLI_MODE) {
      // Standalone mode - check if clicked character matches target
      correct = character.figure === targetFigure;
      console.log(
        `[STANDALONE MODE] Click validation: ${correct ? "Correct!" : "Wrong!"}`,
      );
    } else {
      // Tivoli mode - validate on server
      try {
        correct = await validateClick(sessionId, character.id);
      } catch (err) {
        console.warn(
          "[Game] Validation failed:",
          err instanceof Error ? err.message : String(err),
        );
        setMessage("Connection error, try clicking again.");
        return;
      }
    }

    if (correct) {
      try {
        play("correct");
      } catch (err) {
        console.warn(
          "[Sound] Failed to play 'correct':",
          err instanceof Error ? err.message : String(err),
        );
      }
      const newScore = score + 1;
      timeLeftRef.current += 3;
      setTimeLeft(timeLeftRef.current);

      const nextIndex = levelIndex + 1;
      if (nextIndex >= LEVELS.length) {
        gameEndedRef.current = true;
        setScore(newScore);
        setIsWin(true);
        try {
          play("victory");
        } catch (err) {
          console.warn(
            "[Sound] Failed to play 'victory':",
            err instanceof Error ? err.message : String(err),
          );
        }
        try {
          await endGame(newScore);
          if (user?.name) {
            await saveScore(user.name, newScore);
          }
        } catch (err) {
          const apiError = err as ApiError;
          console.error("Failed to end game:", apiError.message);
        } finally {
          setGameState("gameover");
        }
      } else {
        setScore(newScore);
        setLevelIndex(nextIndex);
        await loadLevel(nextIndex);
      }
    } else {
      setMessage("Wrong!");
      try {
        play("wrong");
      } catch (err) {
        console.warn(
          "[Sound] Failed to play 'wrong':",
          err instanceof Error ? err.message : String(err),
        );
      }
      setTimeout((): void => setMessage(""), 3000);
    }
  }

  async function handleTimeUp(): Promise<void> {
    if (gameEndedRef.current) return;
    gameEndedRef.current = true;
    setTimerRunning(false);

    if (introTimeoutRef.current) {
      clearTimeout(introTimeoutRef.current);
      introTimeoutRef.current = null;
    }

    try {
      await endGame(scoreRef.current);
      if (user?.name && scoreRef.current > 0) {
        await saveScore(user.name, scoreRef.current);
      }
    } catch (err) {
      const apiError = err as ApiError;
      console.error("Error ending game:", apiError.message);
    } finally {
      try {
        play("gameover");
      } catch (err) {
        console.warn(
          "[Sound] Failed to play 'gameover':",
          err instanceof Error ? err.message : String(err),
        );
      }
      setGameState("gameover");
    }
  }

  return {
    gameState,
    setGameState,
    currentLevel,
    targetFigure,
    characters,
    message,
    score,
    loading,
    timeLeft,
    startGame,
    handleClick,
    handleTimeUp,
    transaction,
    error,
    resetToIdle,
    user,
    isWin,
  };
}
