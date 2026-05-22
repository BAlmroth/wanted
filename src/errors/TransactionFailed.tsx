import styles from "./error.module.css";

export default function TransactionFailed({
  onRetry,
}: {
  onRetry: () => void;
}) {
  const tivoliUrl = import.meta.env.VITE_TIVOLI_URL ?? "/";
  return (
    <div className={styles.errorWrapper}>
      <h1>Payment failed</h1>
      <h2>Something went wrong when processing your payment.</h2>
      <h3>Make sure to access this game from Tivoli to play again.</h3>
      <div className={styles.buttonContainer}>
        <button onClick={onRetry}>Try again</button>
        <button onClick={() => (window.location.href = tivoliUrl)}>
          Back to Tivoli
        </button>
      </div>
    </div>
  );
}
