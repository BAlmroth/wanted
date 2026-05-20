const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

import HappyRune from "../assets/HappyRune.png";
import DeadRune from "../assets/DeadRune.png";
import LoveRune from "../assets/LoveRune.png";
import MadRune from "../assets/MadRune.png";
import SadRune from "../assets/SadRune.png";

export type GridCharacter = {
  id: number;
  figure: string;
};

export type LevelData = {
  sessionId: string;
  targetFigure: string;
  grid: GridCharacter[];
};

export async function generateLevel(count: number): Promise<LevelData> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/generate_level`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({ count }),
  });
  const data = await res.json();
  return {
    sessionId: data.sessionId,
    targetFigure: data.targetFigure,
    grid: data.grid.map((figure: string, i: number) => ({ id: i, figure })),
  };
}

export async function validateClick(
  sessionId: string,
  clickedIndex: number,
): Promise<boolean> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/validate_click`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({
      session_id: sessionId,
      clicked_index: clickedIndex,
    }),
  });
  return res.json();
}

const FIGURE_IMAGES: Record<string, string> = {
  happyrune: HappyRune,
  deadrune: DeadRune,
  loverune: LoveRune,
  madrune: MadRune,
  sadrune: SadRune,
};

export function resolveFigure(figure: string): string {
  return FIGURE_IMAGES[figure.trim().toLowerCase()] ?? figure;
}

export function isImage(figure: string): boolean {
  const lower = figure.toLowerCase();
  return (
    lower.startsWith("/") ||
    lower.startsWith("data:image/") ||
    /\.(png|jpe?g|svg|gif)$/.test(lower)
  );
}

// prize for player
export function calculatePayout(levelsCleared: number): number {
  if (levelsCleared > 15) return 3.0;
  if (levelsCleared > 13) return 2.0;
  if (levelsCleared > 10) return 1.8;
  if (levelsCleared > 7) return 1.5;
  if (levelsCleared > 4) return 1.0;
  if (levelsCleared > 1) return 0.5;
  return 0;
}
