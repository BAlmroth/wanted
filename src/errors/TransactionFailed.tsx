import styles from "./error.module.css";

export default function TransactionFailed({
  onRetry,
}: {
  onRetry: () => void;
}) {
  return (
    <div className={styles.errorWrapper}>
      <h1>Payment failed</h1>
      <h2>Something went wrong when processing your payment.</h2>
      <h3 className={styles.subtitle}>Make sure to access this game from Loopland to play again.</h3>
      <div className={styles.buttonContainer}>
        <button onClick={onRetry}>Try again</button>
        <button
          onClick={() =>
            window.parent.postMessage({ type: "AMUSEMENT_CLOSE" }, "")
          }
        >
          Back to Loopland
        </button>
      </div>
    </div>
  );
}
