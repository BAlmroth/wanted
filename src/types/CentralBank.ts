export type CentralbankUser = {
  id: string;
  name: string;
};

export type Stamp = {
  id: string;
  animal: string;
  metal: string;
  image_url: string;
  created_at: string;
  updated_at: string;
};

export type Transaction = {
  id: string;
  stamp: Stamp;
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