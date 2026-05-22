import type { CentralbankUser, Transaction } from "../types/CentralBank";
import { calculatePayout } from "./gameUtils";

// Mock stamps database
const MOCK_STAMPS: Array<{
  animal: string;
  metal: string | null;
  image_url: string;
}> = [
  {
    animal: "lion",
    metal: "gold",
    image_url: "",
  },
  {
    animal: "dolphin",
    metal: "silver",
    image_url: "",
  },
  {
    animal: "toucan",
    metal: "platinum",
    image_url: "",
  },
  {
    animal: "beetlebug",
    metal: "gold",
    image_url: "",
  },
  {
    animal: "snake",
    metal: null,
    image_url: "",
  },
];

function getRandomMockStamp() {
  return MOCK_STAMPS[Math.floor(Math.random() * MOCK_STAMPS.length)];
}

export async function getIdentity(_token: string): Promise<CentralbankUser> {
  console.log("[MOCK] getIdentity called - returning guest user");
  return { id: 123, name: "guest" };
}

export async function createTransaction(
  _identityToken: string,
): Promise<Transaction> {
  const mockStamp = getRandomMockStamp();
  const txn: Transaction = {
    transaction_id: Math.floor(Math.random() * 10000),
    amount: 2.0,
    stamp: mockStamp,
  };
  console.log(
    "[MOCK] createTransaction - returning random stamp:",
    mockStamp.animal,
    mockStamp.metal,
  );
  return txn;
}

export async function sendPayout(
  _transactionId: string,
  levelsCleared: number,
): Promise<void> {
  const amount = calculatePayout(levelsCleared);
  console.log(`[MOCK] sendPayout: €${amount} for ${levelsCleared} levels`);
}
