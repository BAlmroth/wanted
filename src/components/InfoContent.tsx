import styles from "./Info.module.css";

export default function InfoContent() {
  return (
    <>
      <h4 className={styles.tagline}>
        Find the wanted Rune before time runs out!
      </h4>

      <div className={styles.section}>
        <h3>How to play:</h3>
        <ul>
          <li>
            Each round shows a <strong>WANTED</strong> Rune
          </li>
          <li>Find that rune among the characters</li>
          <li>Click or tap the correct rune to catch them</li>
          <li>Each correct catch adds 4 seconds to your time</li>
          <li>Progress through all the levels to complete the game</li>
          <li>Complete more levels to earn bigger rewards!</li>
        </ul>
      </div>

      <div className={styles.sideRow}>
        <div className={styles.section}>
          <h3>Controls:</h3>
          <ul>
            <li>
              <kbd>Mouse / Trackpad</kbd> - Move cursor and click
            </li>
            <li>
              <kbd>Arrow Keys</kbd> - Move cursor on screen (keyboard mode)
            </li>
            <li>
              <kbd>Enter</kbd> or <kbd>Space</kbd> - Select character under
              cursor (keyboard mode)
            </li>
            <li>
              <kbd>Esc</kbd> - Close this dialog
            </li>
          </ul>
        </div>

        <div className={styles.section}>
          <h3>Rewards:</h3>
          <ul>
            <li>1+ level: €0.50</li>
            <li>4+ levels: €1.00</li>
            <li>7+ levels: €1.50</li>
            <li>10+ levels: €1.80</li>
            <li>13+ levels: €2.00</li>
            <li>15+ levels: €3.00</li>
          </ul>
        </div>
      </div>
    </>
  );
}
