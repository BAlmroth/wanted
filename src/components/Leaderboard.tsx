import { useEffect, useState } from "react";
import { getTopFive } from "../utils/leaderboard";
import type { LeaderboardEntry } from "../types/Leaderboard";
import styles from "./InfoBoxes.module.css";

export function Leaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const limit = window.innerWidth >= 768 ? 10 : 5;
        getTopFive(limit).then(setEntries);
      }, 250);
    };

    const limit = window.innerWidth >= 768 ? 10 : 5;
    getTopFive(limit).then(setEntries); // Initial fetch
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
