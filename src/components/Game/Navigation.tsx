import type { ReactNode } from "react";
import type { NavigationProps } from "../../types/Navigation";
import { TIVOLI_MODE } from "../../config";
import styles from "./Navigation.module.css";

export function Navigation({
  onStartGame,
  onInfoClick,
  showPlayButton = true,
}: NavigationProps): ReactNode {
  const isMockMode = !TIVOLI_MODE;
  const hideTivoliButton = isMockMode && showPlayButton;
  const looplandButtonLabel =
    isMockMode && !showPlayButton ? "MAIN PAGE" : "TO LOOPLAND";

  const handleLooplandClick = () => {
    if (isMockMode) {
      window.location.href = "/";
    } else {
      window.parent.postMessage({ type: "AMUSEMENT_CLOSE" }, "*");
    }
  };

  return (
    <section className={styles.infoButtons}>
      {showPlayButton && (
        <button
          className={styles.playBtn}
          onClick={onStartGame}
          aria-label="Start playing the game"
        >
          PLAY
        </button>
      )}
      <div>
        {!hideTivoliButton && (
          <button
            className={styles.tivoliBtn}
            onClick={handleLooplandClick}
            aria-label={looplandButtonLabel}
          >
            {looplandButtonLabel}
          </button>
        )}
        <button
          className={styles.rewardBtn}
          onClick={onInfoClick}
          aria-label="View game information"
        >
          Game Info
        </button>
      </div>
    </section>
  );
}
