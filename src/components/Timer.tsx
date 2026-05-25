import { useEffect, useState, useImperativeHandle, forwardRef } from "react";
import type { TimerProps } from "../types/Game";
import type { TimerHandle } from "../types/Timer";
import styles from "./Timer.module.css";

const Timer = forwardRef<TimerHandle, TimerProps>(
  ({ initialTime, onTimeUp, isPaused }, ref) => {
    const [timeLeft, setTimeLeft] = useState(initialTime);

    useImperativeHandle(ref, () => ({
      addTime: (seconds: number) => {
        setTimeLeft((prev) => prev + seconds);
      },
    }));

    useEffect(() => {
      setTimeLeft(initialTime);
    }, [initialTime]);

    useEffect(() => {
      if (timeLeft <= 0) {
        onTimeUp();
        return;
      }

      if (isPaused) {
        return;
      }

      const interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    }, [timeLeft, onTimeUp, isPaused]);

    useEffect(() => {
      if (timeLeft === 0) {
        onTimeUp();
      }
    }, [timeLeft, onTimeUp]);

    return (
      <p
        className={styles.timer}
        aria-live="polite"
        aria-label={`Time remaining: ${timeLeft} seconds`}
      >
        Time: {timeLeft}
      </p>
    );
  },
);

export default Timer;
