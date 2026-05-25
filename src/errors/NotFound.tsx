import styles from "./error.module.css";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className={styles.errorWrapper}>
      <h1>404</h1>
      <h2>PAGE NOT FOUND</h2>
      <div className={styles.buttonContainer}>
        <button onClick={() => navigate("/")}>Go back home</button>
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
