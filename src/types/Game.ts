import type { LEVELS } from "../data/Levels";
import type { GridCharacter } from "./Character";
import type { Character } from "./Character";
import type { TimerHandle } from "./Timer";
import type { Transaction } from "./CentralBank";

export type GamePhase = "idle" | "playing" | "gameover";
export type ResultType = "win" | "gameover";

export type GameState = {
  characters: Character[];
  score: number;
  timeLeft: number;
  level: number;
  isGameOver: boolean;
};

export type TimerProps = {
  readonly initialTime: number;
  readonly onTimeUp: () => void;
  readonly isPaused?: boolean;
};

export interface GameOnProps {
  readonly currentLevel: (typeof LEVELS)[0];
  readonly targetFigure: string;
  readonly characters: GridCharacter[];
  readonly message: string;
  readonly score: number;
  readonly loading: boolean;
  readonly timerRef: React.RefObject<TimerHandle | null>;
  readonly onCharacterClick: (character: GridCharacter) => void;
  readonly onTimeUp: () => void;
}

export interface GameOverProps {
  readonly score: number;
  readonly currentLevel: (typeof LEVELS)[0];
  readonly onPlayAgain: () => void;
  readonly transaction: Transaction | null;
  readonly resultType?: ResultType;
}

export interface IdleProps {
  readonly onStartGame: () => void;
  readonly userName?: string | null;
}