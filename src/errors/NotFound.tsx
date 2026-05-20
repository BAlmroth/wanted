import styles from "./error.module.css";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  const tivoliUrl = import.meta.env.VITE_TIVOLI_URL ?? "/";
  return (
    <div className={styles.errorWrapper}>
      <h1>404</h1>
      <h2>PAGE NOT FOUND</h2>
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <button onClick={() => navigate("/")}>Go back home</button>
        <button onClick={() => (window.location.href = tivoliUrl)}>
          Back to Tivoli
        </button>
      </div>
    </div>
  );
}
