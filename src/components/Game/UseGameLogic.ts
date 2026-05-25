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
import type { ApiError } from "../../types/CentralBank";
import type { GamePhase } from "../../types/Game";
import type { GridCharacter } from "../../types/Character";

const INITIAL_TIME = 10;

export function useGameLogic() {
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

  function resetToIdle() {
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

  useEffect(() => {
    if (gameState !== "playing") {
      return;
    }

    if (introTimeoutRef.current) {
      clearTimeout(introTimeoutRef.current);
    }

    setTimerRunning(false);
    introTimeoutRef.current = setTimeout(() => {
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

  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  useEffect(() => {
    if (gameState !== "playing" || gameEndedRef.current || !timerRunning) {
      return;
    }

    const interval = setInterval(() => {
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
        data.grid.map((character) => ({
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

  async function startGame() {
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
    } catch {
      return;
    }

    await loadLevel(0);
    setGameState("playing");
  }

  async function handleClick(character: GridCharacter) {
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
      } catch {
        setMessage("Connection error, try clicking again.");
        return;
      }
    }

    if (correct) {
      const newScore = score + 1;
      timeLeftRef.current += 2;
      setTimeLeft(timeLeftRef.current);

      const nextIndex = levelIndex + 1;
      if (nextIndex >= LEVELS.length) {
        gameEndedRef.current = true;
        setScore(newScore);
        setIsWin(true);
        console.log("[GAME WIN] Game completed! Score:", newScore);
        console.log("[GAME WIN] User info:", user);
        try {
          await endGame(currentLevel.level);
          console.log("[GAME WIN] endGame completed successfully");
          if (user?.name) {
            console.log("[GAME WIN] About to save score for user:", user.name, "Score:", newScore);
            await saveScore(user.name, newScore);
            console.log("[GAME WIN] Score saved successfully to Supabase");
          } else {
            console.warn("[GAME WIN] No user name available! User:", user);
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
      setTimeout(() => setMessage(""), 3000);
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

    console.log("[TIME UP] Time's up! Current score:", scoreRef.current);
    console.log("[TIME UP] User info:", user);
    try {
      await endGame(currentLevel.level);
      console.log("[TIME UP] endGame completed successfully");
      if (user?.name && scoreRef.current > 0) {
        console.log("[TIME UP] About to save score for user:", user.name, "Score:", scoreRef.current);
        await saveScore(user.name, scoreRef.current);
        console.log("[TIME UP] Score saved successfully to Supabase");
      } else {
        console.warn("[TIME UP] Score not saved - User name missing or score is 0. User:", user, "Score:", scoreRef.current);
      }
    } catch (err) {
      const apiError = err as ApiError;
      console.error("Error ending game:", apiError.message);
    } finally {
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
