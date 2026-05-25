import type { LeaderboardEntry } from "../types/Leaderboard";
import { TIVOLI_MODE } from "../config";
import { getMockLeaderboard, logMockScore } from "./leaderboard.mock";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const headers = {
  "Content-Type": "application/json",
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
};

export async function getTopFive(
  limit: number = 5,
): Promise<LeaderboardEntry[]> {
  if (!TIVOLI_MODE) {
    return getMockLeaderboard(limit);
  }
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/leaderboard?select=id,name,score&order=score.desc&limit=${limit}`,
    { headers },
  );
  const data: unknown = await res.json();
  return Array.isArray(data)
    ? data.map((entry: Record<string, unknown>) => ({
        id: entry.id as number,
        name: entry.name as string,
        score: entry.score as number,
      }))
    : [];
}

export async function saveScore(name: string, score: number): Promise<void> {
  if (!TIVOLI_MODE) {
    logMockScore(name, score);
    return;
  }
  console.log("[LEADERBOARD] saveScore called with name:", name, "score:", score);
  console.log("[LEADERBOARD] TIVOLI_MODE:", TIVOLI_MODE);
  console.log("[LEADERBOARD] SUPABASE_URL:", SUPABASE_URL);
  const res = await fetch(`${SUPABASE_URL}/rest/v1/leaderboard`, {
    method: "POST",
    headers,
    body: JSON.stringify({ name, score }),
  });
  console.log("[LEADERBOARD] Response status:", res.status, res.statusText);
  if (!res.ok) {
    const errorBody = await res.text();
    console.error("[LEADERBOARD] Error response body:", errorBody);
    throw new Error(`Failed to save score: ${res.statusText}`);
  }
  console.log("[LEADERBOARD] Score saved successfully");
}