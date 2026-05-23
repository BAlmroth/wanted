export const StampAnimal = {
  Lion: "lion",
  Dolphin: "dolphin",
  Toucan: "toucan",
  Beetlebug: "beetlebug",
  Snake: "snake",
} as const;

export type StampAnimal = (typeof StampAnimal)[keyof typeof StampAnimal];

export const StampMetal = {
  Silver: "silver",
  Gold: "gold",
  Platinum: "platinum",
} as const;

export type StampMetal = (typeof StampMetal)[keyof typeof StampMetal];

export type CentralbankUser = {
  readonly id: number;
  readonly name: string;
};

export type Stamp = {
  readonly animal: StampAnimal;
  readonly metal: StampMetal | null;
  readonly image_url: string;
};

export type Transaction = {
  readonly transaction_id: number;
  readonly amount: number;
  readonly stamp: Stamp | null;
};

export type PayoutResponse = {
  transaction_id: number;
  amount: number;
};

export type CentralbankError =
  | { type: "TOKEN_EXPIRED" }
  | { type: "TRANSACTION_FAILED" }
  | { type: "PAYOUT_FAILED" }
  | { type: "IDENTITY_FAILED" };

export interface ApiError {
  message: string;
  status?: number;
}

export type UseCentralbankReturn = {
  user: CentralbankUser | null;
  startGame: () => Promise<Stamp | null>;
  endGame: (levelsCleared: number) => Promise<void>;
  transaction: Transaction | null;
  error: CentralbankError | null;
  clearError: () => void;
};
