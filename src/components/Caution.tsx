import styles from "./Info.module.css";

export default function Caution() {
  return (
    <div
      id="game-caution"
      className={styles.caution}
      role="region"
      aria-label="Game caution warning"
    >
      <h2>CAUTION</h2>
      <h3>
        This game contains flashing lights and fast animations. If you are
        sensitive to visual effects, play with caution.
      </h3>
    </div>
  );
}
