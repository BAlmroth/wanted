import type { ReactNode } from "react";
import styles from "./RuneSpeech.module.css";
import speechbubbleAndRune from "../assets/speechbubbleAndRune.png";
import speechbubbleGameOver from "../assets/speechbubbleGameOver.png";
import speechbubbleWinner from "../assets/speechbubbleWinner.png";
 
interface RuneSpeechProps {
  variant?: "idle" | "gameover" | "winner";
}
 
export function RuneSpeech({ variant = "idle" }: RuneSpeechProps): ReactNode {
  const image = variant === "gameover" ? speechbubbleGameOver : variant === "winner" ? speechbubbleWinner : speechbubbleAndRune;
 
  return (
    <div className={styles.welcomeCard}>
      <img src={image} alt={variant === "gameover" ? "Rune says Game Over" : "Rune says Welcome"} />
    </div>
  );
}
 