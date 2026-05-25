import type { ReactNode } from "react";
import styles from "./RuneSpeech.module.css";
import speechbubbleAndRune from "../assets/speechbubbleAndRune.png";
import speechbubbleGameOver from "../assets/speechbubbleGameOver.png";
 
interface RuneSpeechProps {
  variant?: "idle" | "gameover";
}
 
export function RuneSpeech({ variant = "idle" }: RuneSpeechProps): ReactNode {
  const image = variant === "gameover" ? speechbubbleGameOver : speechbubbleAndRune;
 
  return (
    <div className={styles.welcomeCard}>
      <img src={image} alt={variant === "gameover" ? "Rune says Game Over" : "Rune says Welcome"} />
    </div>
  );
}
 