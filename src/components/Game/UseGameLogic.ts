import { useState, useRef } from "react";
import type { TimerHandle } from "../Timer";
import { LEVELS } from "../../data/Levels";
import {
  generateLevel,
  validateClick,
  resolveFigure,
  type GridCharacter,
} from "../../utils/gameUtils";
import { saveScore } from "../../utils/leaderboard";
import { useCentralbank } from "../../hooks/useCentralbank";
import { TIVOLI_MODE } from "../../config";

export function useGameLogic() {
  const [gameState, setGameState] = useState<"idle" | "playing" | "gameover">(
    "idle",
  );
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

  async function loadLevel(index: number) {
    setLoading(true);
    setMessage("");
    const data = await generateLevel(LEVELS[index].gridCount);
    setSessionId(data.sessionId);
    setTargetFigure(resolveFigure(data.targetFigure));
    setCharacters(
      data.grid.map((character) => ({
        ...character,
        figure: resolveFigure(character.figure),
      })),
    );
    setLoading(false);
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
        // Game completed - save score and end game
        gameEndedRef.current = true;
        setScore(newScore);
        setIsWin(true);
        await endGame(currentLevel.level);
        if (user?.name) {
          try {
            await saveScore(user.name, newScore);
          } catch (err) {
            console.error("Failed to save score:", err);
          }
        }
        setGameState("gameover");
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

  async function handleTimeUp() {
    // Time's up - end game with current level and save score
    if (gameEndedRef.current) {
      return;
    }
    gameEndedRef.current = true;

    await endGame(currentLevel.level);
    if (user?.name && score > 0) {
      try {
        await saveScore(user.name, score);
      } catch (err) {
        console.error("Failed to save score:", err);
      }
    }
    setGameState("gameover");
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
