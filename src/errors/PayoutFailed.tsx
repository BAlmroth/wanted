import styles from "./error.module.css";

interface PayoutFailedProps {
  transactionId?: string;
}

export default function PayoutFailed({ transactionId }: PayoutFailedProps) {
  const tivoliUrl = import.meta.env.VITE_TIVOLI_URL ?? "/";
  return (
    <div className={styles.errorWrapper}>
      <h1>Payout failed</h1>
      <h2>Something went wrong when processing your reward.</h2>
      <h2>Please contact centralbank for help.</h2>
      {transactionId && (
        <h2>
          Transaction ID: <strong>{transactionId}</strong>
        </h2>
      )}
      <div style={{ marginTop: 16 }}>
        <button onClick={() => (window.location.href = tivoliUrl)}>
          Back to Tivoli
        </button>
      </div>
    </div>
  );
}
