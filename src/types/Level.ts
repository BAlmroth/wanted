import type { Character } from "./Character";

export type LevelConfig = {
  readonly level: number;
  readonly gridCount: number;
  readonly carousel?: boolean;
  readonly carouselSpeed?: number;
  readonly carouselGap?: number;
  readonly carouselCols?: number;
  readonly gridCols?: number;
  readonly carouselShakiness?: number;
  readonly carouselSameDirection?: boolean; 
  readonly carouselVertical?: boolean;
};

export type CarouselProps = {
  characters: Character[];
  cols: number;
  onCharacterClick: (c: Character) => void;
  speed?: number;
  gap?: number;
  shakiness?: number;
  sameDirection?: boolean;
  vertical?: boolean;
};

export type CarouselRowProps = {
  row: Character[];
  direction: "left" | "right";
  onCharacterClick: (c: Character) => void;
};