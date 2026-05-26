import type { LevelData } from "../types/Level";

// Mock figures database
const MOCK_FIGURES = [
  "happyrune",
  "deadrune",
  "loverune",
  "madrune",
  "sadrune",
];

function getRandomFigure(): string {
  return MOCK_FIGURES[Math.floor(Math.random() * MOCK_FIGURES.length)];
}

export function generateMockLevel(count: number): LevelData {
  // Ensure the target figure appears exactly once in the generated grid
  const targetFigure = getRandomFigure();
  const targetIndex = Math.floor(Math.random() * count);

  const figures: string[] = [];
  for (let i = 0; i < count; i++) {
    if (i === targetIndex) {
      figures.push(targetFigure);
    } else {
      // choose a figure that is not the target so target appears only once
      const options = MOCK_FIGURES.filter((f: string) => f !== targetFigure);
      figures.push(options[Math.floor(Math.random() * options.length)]);
    }
  }

  console.log(
    `[MOCK] generateLevel: ${count} figures, target "${targetFigure}" at index ${targetIndex}`,
  );

  return {
    sessionId: `mock-session-${Date.now()}-${Math.random().toString(36).substring(7)}`,
    targetFigure,
    grid: figures.map((figure: string, i: number) => ({ id: i, figure })),
  };
}
