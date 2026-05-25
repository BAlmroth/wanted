import { TIVOLI_MODE } from "../config";
import styles from "./CloseButton.module.css";
import xIcon from "../assets/x.png";

export function CloseButton() {
  if (!TIVOLI_MODE) {
    return null;
  }

  return (
    <button
      className={styles.closeButton}
      onClick={() =>
        window.parent.postMessage({ type: "AMUSEMENT_CLOSE" }, "*")
      }
      aria-label="Close and return to Loopland"
      title="Back to Loopland"
    >
      <img src={xIcon} alt="Close" className={styles.icon} />
    </button>
  );
}
