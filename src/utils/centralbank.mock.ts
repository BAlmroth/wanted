import type { CentralbankUser, Transaction, Stamp } from "../types/CentralBank";
import { calculatePayout } from "./gameUtils";
import { StampAnimal, StampMetal } from "../types/CentralBank";

// Mock stamps database
const MOCK_STAMPS: Stamp[] = [
  { animal: StampAnimal.Lion, metal: StampMetal.Gold, image_url: "" },
  { animal: StampAnimal.Dolphin, metal: StampMetal.Silver, image_url: "" },
  { animal: StampAnimal.Toucan, metal: StampMetal.Platinum, image_url: "" },
  { animal: StampAnimal.Beetlebug, metal: StampMetal.Gold, image_url: "" },
  { animal: StampAnimal.Snake, metal: null, image_url: "" },
];

function getRandomMockStamp(): Stamp {
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
