import styles from "./error.module.css";

export default function TokenExpired() {
  return (
    <div className={styles.errorWrapper}>
      <h1>Session expired</h1>
      <h2>
        Your token has already been used or has expired (they last 5 minutes).
      </h2>
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <a href="/">← Back to Loopland</a>
        <button
          onClick={() =>
            window.parent.postMessage({ type: "AMUSEMENT_CLOSE" }, "*")
          }
        >
          Back to Loopland
        </button>
      </div>
    </div>
  );
}
