import type { TimerProps } from "../types/Game";
import styles from "./Timer.module.css";

export default function Timer({ timeLeft }: TimerProps) {
  return (
    <p
      className={styles.timer}
      aria-live="polite"
      aria-label={`Time remaining: ${timeLeft} seconds`}
    >
      Time: {timeLeft}
    </p>
  );
}
