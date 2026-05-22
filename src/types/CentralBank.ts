export type CentralbankUser = {
  id: number;
  name: string;
};

export type Stamp = {
  animal: string;
  metal: string | null;
  image_url: string;
};

export type Transaction = {
  transaction_id: number;
  amount: number;
  stamp: Stamp | null;
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