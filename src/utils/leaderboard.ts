import type { LeaderboardEntry } from "../types/Leaderboard";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const headers = {
  "Content-Type": "application/json",
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
};

export async function getTopFive(limit: number = 5): Promise<LeaderboardEntry[]> {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/leaderboard?select=id,name,score&order=score.desc&limit=${limit}`,
    { headers }
  );
  const data = await res.json();
  // Ensure we only return the fields we expect
  return Array.isArray(data) ? data.map((entry: any) => ({
    id: entry.id,
    name: entry.name,
    score: entry.score,
  })) : [];
}

export async function saveScore(name: string, score: number): Promise<void> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/leaderboard`, {
    method: "POST",
    headers,
    body: JSON.stringify({ name, score }),
  });
  // Just check if successful, don't return the response data
  if (!res.ok) {
    throw new Error(`Failed to save score: ${res.statusText}`);
  }
}