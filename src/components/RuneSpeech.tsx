import type { ReactNode } from "react";
import styles from "./RuneSpeech.module.css";
import speechbubbleAndRune from "../assets/speechbubbleAndRune.png";

export function RuneSpeech(): ReactNode {
  return (
    <div className={styles.welcomeCard}>
      <img
        src={speechbubbleAndRune}
        alt="Rune say Welcome"
      />
    </div>
  );
}
