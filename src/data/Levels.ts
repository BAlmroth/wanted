import type { LevelConfig } from "../types/Level";

export const LEVELS: LevelConfig[] = [
  { level: 1, gridCount: 4 },
  { level: 2, gridCount: 9 },
  { level: 3, gridCount: 16 },
  { level: 4, gridCount: 25 },
{ level: 5, gridCount: 30, gridCols: 6 },
  { level: 6,  gridCount: 24, carousel: true, carouselSpeed: 80,  carouselGap: 44, carouselCols: 4, carouselShakiness: 0,   carouselSameDirection: false },
  { level: 7,  gridCount: 28, carousel: true, carouselSpeed: 100, carouselGap: 30, carouselCols: 5, carouselShakiness: 0.1, carouselSameDirection: true  },
  { level: 8,  gridCount: 34, carousel: true, carouselSpeed: 120, carouselGap: 18, carouselCols: 6, carouselShakiness: 0.2, carouselSameDirection: false },
  { level: 9, gridCount: 35, carousel: true, carouselSpeed: 130, carouselGap: 20, carouselCols: 5, carouselShakiness: 0.1, carouselSameDirection: false, carouselVertical: true },
  { level: 10,  gridCount: 38, carousel: true, carouselSpeed: 140, carouselGap: 10, carouselCols: 7, carouselShakiness: 0.3, carouselSameDirection: true  },
  { level: 11, gridCount: 40, carousel: true, carouselSpeed: 170, carouselGap: 10, carouselCols: 6, carouselShakiness: 0.2, carouselSameDirection: true,  carouselVertical: true },
  { level: 12, gridCount: 38, carousel: true, carouselSpeed: 180, carouselGap: 4,  carouselCols: 7, carouselShakiness: 0.4, carouselSameDirection: true  },
  { level: 13, gridCount: 40, carousel: true, carouselSpeed: 220, carouselGap: 2,  carouselCols: 7, carouselShakiness: 0.4, carouselSameDirection: false },
  { level: 14, gridCount: 42, carousel: true, carouselSpeed: 230, carouselGap: 4,  carouselCols: 7, carouselShakiness: 0.3, carouselSameDirection: true  },
  { level: 15, gridCount: 42, carousel: true, carouselSpeed: 235, carouselGap: 4,  carouselCols: 6, carouselShakiness: 0.3, carouselSameDirection: false, carouselVertical: true },
  { level: 16, gridCount: 42, carousel: true, carouselSpeed: 240, carouselGap: 2,  carouselCols: 7, carouselShakiness: 0.3, carouselSameDirection: false },

];

//too close to other levels

  // { level: 11, gridCount: 38, carousel: true, carouselSpeed: 160, carouselGap: 4,  carouselCols: 7, carouselShakiness: 0.4, carouselSameDirection: false },
    // { level: 18, gridCount: 42, carousel: true, carouselSpeed: 260, carouselGap: 2,  carouselCols: 7, carouselShakiness: 0.3, carouselSameDirection: true  },
  // { level: 19, gridCount: 42, carousel: true, carouselSpeed: 260, carouselGap: 2,  carouselCols: 7, carouselShakiness: 0.3, carouselSameDirection: false },