import styles from "./InfoBoxes.module.css";

export default function Instructions() {
  return (
    <div
      id="game-instructions"
      className={styles.box}
      role="region"
      aria-label="Game instructions"
    >
      <h3>INSTRUCTIONS</h3>
      <p>
        Runes family is visiting Yrgo but one is an imposter... Find the wanted
        Rune and catch them before time runs out!
      </p>
    </div>
  );
}
