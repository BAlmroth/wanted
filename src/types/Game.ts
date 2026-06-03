import type { LEVELS } from "../data/Levels";
import type { GridCharacter } from "./Character";
import type { Character } from "./Character";
import type { Transaction } from "./CentralBank";
import type { UseCentralbankReturn } from "./CentralBank";
import type { Dispatch, SetStateAction } from "react";

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
  readonly timeLeft: number;
};

export interface GameOnProps {
  readonly currentLevel: (typeof LEVELS)[0];
  readonly targetFigure: string;
  readonly characters: GridCharacter[];
  readonly message: string;
  readonly score: number;
  readonly loading: boolean;
  readonly timeLeft: number;
  readonly onCharacterClick: (character: GridCharacter) => void;
}

export interface GameOverProps {
  readonly score: number;
  readonly currentLevel: (typeof LEVELS)[0];
  readonly onPlayAgain: (playerName?: string) => void | Promise<void>;
  readonly transaction: Transaction | null;
  readonly resultType?: ResultType;
}

export interface IdleProps {
  readonly onStartGame: (playerName?: string) => void | Promise<void>;
  readonly userName?: string | null;
}

export type UseGameLogicReturn = {
  gameState: GamePhase;
  setGameState: Dispatch<SetStateAction<GamePhase>>;
  currentLevel: (typeof LEVELS)[number];
  targetFigure: string;
  characters: GridCharacter[];
  message: string;
  score: number;
  loading: boolean;
  timeLeft: number;
  startGame: (playerName?: string) => Promise<void>;
  handleClick: (character: GridCharacter) => Promise<void>;
  handleTimeUp: () => Promise<void>;
  transaction: UseCentralbankReturn["transaction"];
  error: UseCentralbankReturn["error"];
  resetToIdle: () => void;
  user: UseCentralbankReturn["user"];
  isWin: boolean;
};
