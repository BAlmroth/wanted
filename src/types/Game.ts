import type { LEVELS } from "../data/Levels";
import type { GridCharacter } from "../utils/gameUtils";
import type { Character } from "./Character";
import type { TimerHandle } from "../components/Timer";
import type { Transaction } from "./CentralBank";

export type GameState = {
  characters: Character[];
  score: number;
  timeLeft: number;
  level: number;
  isGameOver: boolean;
};

export type TimerProps = {
  initialTime: number;
  onTimeUp: () => void;
};

export interface GameOnProps {
  currentLevel: (typeof LEVELS)[0];
  targetFigure: string;
  characters: GridCharacter[];
  message: string;
  score: number;
  loading: boolean;
  timerKey: number;
  timerRef: React.RefObject<TimerHandle | null>;
  onCharacterClick: (character: GridCharacter) => void;
  onTimeUp: () => void;
}

export interface GameOverProps {
  score: number;
  currentLevel: (typeof LEVELS)[0];
  onPlayAgain: () => void;
  transaction: Transaction | null;
}

export interface IdleProps {
  onStartGame: () => void;
  userName?: string | null;
}
