import { useEffect, useState } from "react";
import { getTopFive } from "../utils/leaderboard";
import type { LeaderboardEntry } from "../types/Leaderboard";
import styles from "./InfoBoxes.module.css";
import type { ApiError } from "../types/CentralBank";

export function Leaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const fetchEntries = (limit: number): void => {
      getTopFive(limit)
        .then(setEntries)
        .catch((err: ApiError) => {
          console.warn("Leaderboard unavailable:", err.message);
        });
    };

    const handleResize = (): void => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const limit = window.innerWidth >= 768 ? 10 : 5;
        fetchEntries(limit);
      }, 250);
    };

    const limit = window.innerWidth >= 768 ? 10 : 5;
    fetchEntries(limit);
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={styles.box}>
      <h3 className={styles.leaderboardH}>LEADERBOARD</h3>
      <ol className={styles.list}>
        {entries.map((entry, index) => (
          <li key={entry.id} className={styles.entry}>
            <span className={styles.rank}>{index + 1}.</span>
            <span className={styles.name}>{entry.name}</span>
            <span className={styles.dots} />
            <span className={styles.score}>{entry.score}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
