import type { LeaderboardEntry } from "../types/Leaderboard";

// Mock leaderboard data
export const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { id: 1, name: "Rune", score: 16 },
  { id: 2, name: "Runes mamma", score: 10 },
  { id: 3, name: "Runes granne", score: 9 },
  { id: 4, name: "Runelia", score: 9 },
  { id: 5, name: "Wilmer", score: 8 },
];

export function getMockLeaderboard(limit: number = 5): LeaderboardEntry[] {
  console.log(
    `[MOCK] getTopFive: returning ${Math.min(limit, MOCK_LEADERBOARD.length)} entries`,
  );
  return MOCK_LEADERBOARD.slice(0, limit);
}

export function logMockScore(name: string, score: number): void {
  console.log(`[MOCK] saveScore: ${name} - ${score}`);
}
