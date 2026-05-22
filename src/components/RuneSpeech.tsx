import type { ReactNode } from "react";
import styles from "./RuneSpeech.module.css";
import HappyRuneImg from "../assets/HappyRune.png";
import SpeechBubbleImg from "../assets/speechbubble.png";

export function RuneSpeech(): ReactNode {
  return (
    <div className={styles.welcomeCard}>
      <img
        src={SpeechBubbleImg}
        alt="Speech bubble"
        className={styles.speechBubble}
      />
      <p className={styles.welcomeText}>Welcome!</p>
      <img
        src={HappyRuneImg}
        alt="Happy rune"
        className={styles.happyRune}
      />
    </div>
  );
}
