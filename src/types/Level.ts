import type { Character } from "./Character";

export type LevelConfig = {
  level: number;
  gridCount: number;
  carousel?: boolean;
  carouselSpeed?: number;
  carouselGap?: number;
  carouselCols?: number;
  carouselShakiness?: number; // 0-1, greater = more skakning
  carouselSameDirection?: boolean; 
  carouselVertical?: boolean;
};

export type CarouselProps = {
  characters: Character[];
  cols: number;
  onCharacterClick: (c: Character) => void;
  speed?: number;
  gap?: number;
  shakiness?: number; // 0-1, greater = more skakning
  sameDirection?: boolean;
  vertical?: boolean;
};

export type CarouselRowProps = {
  row: Character[];
  direction: "left" | "right";
  onCharacterClick: (c: Character) => void;
};