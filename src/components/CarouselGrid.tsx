import { memo, useRef, useEffect } from "react";
import type { CarouselProps } from "../types/Level";
import type { Character } from "../types/Character";
import styles from "./CarouselGrid.module.css";
import { isImage } from "../utils/gameUtils";

const ITEM_W = 72;
const ITEM_H = 72;
const MAX_TRACK = 425;

const CarouselGrid = memo(function CarouselGrid({
  characters,
  cols,
  onCharacterClick,
  speed = 60,
  gap = 20,
  shakiness = 0,
  sameDirection = false,
  vertical = false,
}: CarouselProps) {
  if (vertical) {
    const columns: Character[][] = Array.from({ length: cols }, () => []);
    characters.forEach((char: Character, i: number) =>
      columns[i % cols].push(char),
    );

    return (
      <div className={styles.carouselGridVertical}>
        {columns.map((col: Character[], colIndex: number) => {
          let direction: "up" | "down" = colIndex % 2 === 0 ? "up" : "down";
          if (sameDirection) direction = direction === "up" ? "down" : "up";

          return (
            <CarouselColumn
              key={colIndex}
              items={col}
              direction={direction}
              onCharacterClick={onCharacterClick}
              speed={speed}
              gap={gap}
              shakiness={shakiness}
            />
          );
        })}
      </div>
    );
  }

  const rows: Character[][] = [];
  for (let i = 0; i < characters.length; i += cols) {
    rows.push(characters.slice(i, i + cols));
  }

  return (
    <div className={styles.carouselGrid}>
      {rows.map((row: Character[], rowIndex: number) => {
        let direction: "left" | "right" = rowIndex % 2 === 0 ? "left" : "right";
        if (sameDirection) direction = direction === "left" ? "right" : "left";

        return (
          <CarouselRow
            key={rowIndex}
            items={row}
            direction={direction}
            onCharacterClick={onCharacterClick}
            speed={speed}
            gap={gap}
            shakiness={shakiness}
          />
        );
      })}
    </div>
  );
});

export default CarouselGrid;

function CarouselRow({
  items,
  direction,
  onCharacterClick,
  speed,
  gap,
  shakiness,
}: {
  items: Character[];
  direction: "left" | "right";
  onCharacterClick: (c: Character) => void;
  speed: number;
  gap: number;
  shakiness: number;
}) {
  const stripRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const lastTsRef = useRef<number | null>(null);
  const rafRef = useRef(0);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const slotW = ITEM_W + gap;
  const oneSetW = items.length * slotW;
  const copiesNeeded = Math.ceil((MAX_TRACK + oneSetW) / oneSetW) + 1;
  const totalW = copiesNeeded * oneSetW;

  const repeated = Array.from(
    { length: copiesNeeded * items.length },
    (_: unknown, i: number) => items[i % items.length],
  );

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ): void => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prevIndex = (index - 1 + items.length) % items.length;
      buttonRefs.current[prevIndex]?.focus();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      const nextIndex = (index + 1) % items.length;
      buttonRefs.current[nextIndex]?.focus();
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onCharacterClick(items[index % items.length]);
    }
  };

  useEffect((): (() => void) => {
    offsetRef.current = direction === "right" ? -oneSetW : 0;
    lastTsRef.current = null;

    function tick(ts: number): void {
      if (lastTsRef.current === null) lastTsRef.current = ts;
      const delta = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;

      if (direction === "left") {
        offsetRef.current -= speed * delta;
        if (offsetRef.current <= -oneSetW) offsetRef.current += oneSetW;
      } else {
        offsetRef.current += speed * delta;
        if (offsetRef.current >= 0) offsetRef.current -= oneSetW;
      }

      const shakeAmount = shakiness * 8;
      const shakeX = (Math.random() - 0.5) * shakeAmount;
      const shakeY = (Math.random() - 0.5) * shakeAmount;

      if (stripRef.current) {
        stripRef.current.style.transform = `translateX(${offsetRef.current + shakeX}px) translateY(${shakeY}px)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current);
      lastTsRef.current = null;
    };
  }, [direction, speed, oneSetW, shakiness]);

  return (
    <div className={styles.track}>
      <div ref={stripRef} className={styles.strip} style={{ width: totalW }}>
        {repeated.map((char: Character, i: number) => (
          <div key={i} className={styles.slot} style={{ width: slotW }}>
            <button
              ref={(el: HTMLButtonElement | null) => {
                buttonRefs.current[i % items.length] = el;
              }}
              className={styles.item}
              style={{ width: ITEM_W, height: ITEM_H }}
              onClick={() => onCharacterClick(items[i % items.length])}
              onKeyDown={(e: React.KeyboardEvent<HTMLButtonElement>) =>
                handleKeyDown(e, i)
              }
              aria-label={`Character ${(i % items.length) + 1}`}
            >
              {isImage(char.figure) ? (
                <img src={char.figure} alt="character" className={styles.img} />
              ) : (
                <span className={styles.emoji}>{char.figure}</span>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function CarouselColumn({
  items,
  direction,
  onCharacterClick,
  speed,
  gap,
  shakiness,
}: {
  items: Character[];
  direction: "up" | "down";
  onCharacterClick: (c: Character) => void;
  speed: number;
  gap: number;
  shakiness: number;
}) {
  const stripRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const lastTsRef = useRef<number | null>(null);
  const rafRef = useRef(0);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const slotH = ITEM_H + gap;
  const oneSetH = items.length * slotH;
  const copiesNeeded = Math.ceil((MAX_TRACK + oneSetH) / oneSetH) + 1;
  const totalH = copiesNeeded * oneSetH;

  const repeated = Array.from(
    { length: copiesNeeded * items.length },
    (_: unknown, i: number) => items[i % items.length],
  );

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ): void => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const prevIndex = (index - 1 + items.length) % items.length;
      buttonRefs.current[prevIndex]?.focus();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIndex = (index + 1) % items.length;
      buttonRefs.current[nextIndex]?.focus();
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onCharacterClick(items[index % items.length]);
    }
  };

  useEffect((): (() => void) => {
    offsetRef.current = direction === "down" ? -oneSetH : 0;
    lastTsRef.current = null;

    function tick(ts: number): void {
      if (lastTsRef.current === null) lastTsRef.current = ts;
      const delta = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;

      if (direction === "up") {
        offsetRef.current -= speed * delta;
        if (offsetRef.current <= -oneSetH) offsetRef.current += oneSetH;
      } else {
        offsetRef.current += speed * delta;
        if (offsetRef.current >= 0) offsetRef.current -= oneSetH;
      }

      const shakeAmount = shakiness * 8;
      const shakeX = (Math.random() - 0.5) * shakeAmount;
      const shakeY = (Math.random() - 0.5) * shakeAmount;

      if (stripRef.current) {
        stripRef.current.style.transform = `translateX(${shakeX}px) translateY(${offsetRef.current + shakeY}px)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current);
      lastTsRef.current = null;
    };
  }, [direction, speed, oneSetH, shakiness]);

  return (
    <div className={styles.columnTrack}>
      <div
        ref={stripRef}
        className={styles.columnStrip}
        style={{ height: totalH }}
      >
        {repeated.map((char: Character, i: number) => (
          <div key={i} className={styles.columnSlot} style={{ height: slotH }}>
            <button
              ref={(el: HTMLButtonElement | null) => {
                buttonRefs.current[i % items.length] = el;
              }}
              className={styles.item}
              style={{ width: ITEM_W, height: ITEM_H }}
              onClick={() => onCharacterClick(items[i % items.length])}
              onKeyDown={(e: React.KeyboardEvent<HTMLButtonElement>) =>
                handleKeyDown(e, i)
              }
              aria-label={`Character ${(i % items.length) + 1}`}
            >
              {isImage(char.figure) ? (
                <img src={char.figure} alt="character" className={styles.img} />
              ) : (
                <span className={styles.emoji}>{char.figure}</span>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
