import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
import styles from "./VirtualCursor.module.css";

export function VirtualCursor() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorVisible, setCursorVisible] = useState(false);
  const cursorRef = useRef({ x: 0, y: 0 });

  // Initialize cursor position to center of screen
  useEffect(() => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    cursorRef.current = { x: centerX, y: centerY };
    setCursorPos({ x: centerX, y: centerY });
  }, []);

  // Virtual cursor movement with arrow keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const CURSOR_SPEED = 30;
      let moved = false;

      switch (e.key) {
        case "ArrowUp":
          e.preventDefault();
          setCursorVisible(true);
          cursorRef.current.y = Math.max(0, cursorRef.current.y - CURSOR_SPEED);
          moved = true;
          break;
        case "ArrowDown":
          e.preventDefault();
          setCursorVisible(true);
          cursorRef.current.y = Math.min(
            window.innerHeight - 10,
            cursorRef.current.y + CURSOR_SPEED,
          );
          moved = true;
          break;
        case "ArrowLeft":
          e.preventDefault();
          setCursorVisible(true);
          cursorRef.current.x = Math.max(0, cursorRef.current.x - CURSOR_SPEED);
          moved = true;
          break;
        case "ArrowRight":
          e.preventDefault();
          setCursorVisible(true);
          cursorRef.current.x = Math.min(
            window.innerWidth - 10,
            cursorRef.current.x + CURSOR_SPEED,
          );
          moved = true;
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          // Temporarily hide cursor to find element underneath
          const cursorElement = document.querySelector(
            `.${styles.virtualCursor}`,
          ) as HTMLElement;
          if (cursorElement) {
            cursorElement.style.display = "none";
          }

          const element = document.elementFromPoint(
            cursorRef.current.x,
            cursorRef.current.y,
          ) as HTMLElement;

          // Show cursor again
          if (cursorElement) {
            cursorElement.style.display = "block";
          }

          // Click the button or its parent if it's an image inside a button
          let targetButton: HTMLButtonElement | null = null;
          if (element && element.tagName === "BUTTON") {
            targetButton = element as HTMLButtonElement;
          } else if (element && element.closest("button")) {
            targetButton = element.closest("button") as HTMLButtonElement;
          }

          if (targetButton) {
            targetButton.click();
          }
          return;
        case "Tab":
          e.preventDefault();
          return;
        default:
          return;
      }

      if (moved) {
        setCursorPos({ ...cursorRef.current });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return createPortal(
    <div
      className={styles.virtualCursor}
      style={{
        left: `${cursorPos.x}px`,
        top: `${cursorPos.y}px`,
        opacity: cursorVisible ? 1 : 0,
        transition: "opacity 0.2s ease",
      }}
    />,
    document.body,
  );
}
