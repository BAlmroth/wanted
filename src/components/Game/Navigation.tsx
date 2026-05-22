import type { ReactNode } from "react";
import type { IdleProps } from "../../types/Game";
import { TIVOLI_MODE } from "../../config";
import styles from "./Idle.module.css";

interface NavigationProps extends IdleProps {
  onInfoClick?: () => void;
  showPlayButton?: boolean;
  tivoliUrl?: string;
}

export function Navigation({
  onStartGame,
  onInfoClick,
  showPlayButton = true,
  tivoliUrl,
}: NavigationProps): ReactNode {
  const isMockMode = !TIVOLI_MODE;
  const hideTivoliButton = isMockMode && showPlayButton;
  const tivoliButtonLabel =
    isMockMode && !showPlayButton ? "MAIN PAGE" : "TO TIVOLI";

  const handleTivoliClick = () => {
    if (isMockMode) {
      window.location.href = "/";
    } else if (tivoliUrl) {
      window.location.href = tivoliUrl;
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
            onClick={handleTivoliClick}
            aria-label={tivoliButtonLabel}
          >
            {tivoliButtonLabel}
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
