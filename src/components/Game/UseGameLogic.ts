import { useState, useRef } from "react";
import type { TimerHandle } from "../../types/Timer";
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

export function useGameLogic() {
  const [gameState, setGameState] = useState<GamePhase>("idle");
  const [levelIndex, setLevelIndex] = useState(0);
  const [targetFigure, setTargetFigure] = useState("");
  const [characters, setCharacters] = useState<GridCharacter[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(0);
  const [timerKey, setTimerKey] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isWin, setIsWin] = useState(false);
  const gameEndedRef = useRef(false);
  const timerRef = useRef<TimerHandle>(null);
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
    setGameState("idle");
    setCharacters([]);
    setTargetFigure("");
    setScore(0);
    setLevelIndex(0);
    setIsWin(false);
  }

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
    setTimerKey((k) => k + 1);
    gameEndedRef.current = false;

    try {
      await startCentralbankGame();
    } catch {
      return;
    }

    setGameState("playing");
    await loadLevel(0);
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
      timerRef.current?.addTime(2);

      const nextIndex = levelIndex + 1;
      if (nextIndex >= LEVELS.length) {
        gameEndedRef.current = true;
        setScore(newScore);
        setIsWin(true);
        try {
          await endGame(currentLevel.level);
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
      setTimeout(() => setMessage(""), 3000);
    }
  }

  async function handleTimeUp(): Promise<void> {
    if (gameEndedRef.current) return;
    gameEndedRef.current = true;

    try {
      await endGame(currentLevel.level);
      if (user?.name && score > 0) {
        await saveScore(user.name, score);
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
    timerKey,
    timerRef,
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
