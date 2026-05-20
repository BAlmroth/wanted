import type { CentralbankUser, Transaction } from "../types/CentralBank";
import { calculatePayout } from "./gameUtils";

// Mock stamps database
const MOCK_STAMPS = [
  {
    id: "mock-stamp-1",
    animal: "eagle",
    metal: "gold",
    image_url: "",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "mock-stamp-2",
    animal: "lion",
    metal: "silver",
    image_url: "",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "mock-stamp-3",
    animal: "bear",
    metal: "bronze",
    image_url: "",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "mock-stamp-4",
    animal: "wolf",
    metal: "gold",
    image_url: "",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "mock-stamp-5",
    animal: "raven",
    metal: "silver",
    image_url: "",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

function getRandomMockStamp() {
  return MOCK_STAMPS[Math.floor(Math.random() * MOCK_STAMPS.length)];
}

export async function getIdentity(_token: string): Promise<CentralbankUser> {
  console.log("[MOCK] getIdentity called - returning guest user");
  return { id: "guest-123", name: "guest" };
}

export async function createTransaction(
  _identityToken: string,
): Promise<Transaction> {
  const mockStamp = getRandomMockStamp();
  const txn = {
    id: `mock-txn-${Date.now()}-${Math.random().toString(36).substring(7)}`,
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
