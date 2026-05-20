import { useState } from "react";
import type { GameOverProps } from "../../types/Game";
import styles from "./GameOver.module.css";
import { Leaderboard } from "../Leaderboard";
import { Navigation } from "./Navigation";
import Info from "../Info";
import { calculatePayout } from "../../utils/gameUtils";

interface GameOverWithTypeProps extends GameOverProps {
  resultType?: "gameover" | "win";
}

export function GameOver({
  score,
  currentLevel,
  onPlayAgain,
  transaction,
  resultType = "gameover",
}: GameOverWithTypeProps) {
  const [infoMode, setInfoMode] = useState<null | "play" | "info">(null);

  const openInfoForPlay = () => setInfoMode("play");
  const openInfo = () => setInfoMode("info");
  const handleStartFromInfo = () => {
    setInfoMode(null);
    onPlayAgain();
  };
  const euro = calculatePayout(currentLevel.level);

  // Convert HTTP to HTTPS for stamp image URL to avoid mixed content warnings
  const stampImageUrl = transaction?.stamp?.image_url?.replace(
    /^http:\/\//,
    "https://"
  );

  const resultText = resultType === "win" ? "WINNER" : "GAME OVER";
  const subtitleText = resultType === "win" ? "Congratulations! You cleared all levels" : "Thanks for playing.. Try again for a chance to win the jackpot";
  const containerClassName = resultType === "win" ? styles.winContainer : styles.overContainer;
  const titleClassName = resultType === "win" ? styles.titleWinner : styles.titleGameOver;

  return (
    <div className={containerClassName}>
      <h1 className={titleClassName}>{resultText}</h1>
      <h3>{subtitleText}</h3>

      <section className={styles.infoBoxes}>
        <div className={styles.box}>
          <div className={styles.statsRow}>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Score:</span>
              <span className={styles.statValue}>{score}</span>
            </div>

            <div className={styles.statItem}>
              <span className={styles.statLabel}>Level:</span>
              <span className={styles.statValue}>{score}</span>
            </div>
          </div>

          <div className={styles.rewardBox}>
            <p>€{euro}</p>
            <p>
              Stamp: {transaction?.stamp?.animal} {transaction?.stamp?.metal}
            </p>
            {transaction?.stamp?.image_url && (
              <img className={styles.stamp} src={stampImageUrl} alt="Your stamp" />
            )}
          </div>
        </div>

        <Leaderboard />
      </section>


      {/* out commented Nav and wrote it without play again button, will be changed if tvoli choose to have the functionality yo play again, right now you have to go back to tivoli for play again */}
      {/* <Navigation onStartGame={openInfoForPlay} onInfoClick={openInfo} /> */}
      <Navigation 
        onStartGame={openInfoForPlay} 
        onInfoClick={openInfo}
        showPlayButton={false}
        tivoliUrl={import.meta.env.VITE_TIVOLI_URL}
      />

      <Info
        isOpen={infoMode !== null}
        onClose={() => setInfoMode(null)}
        onStartGame={handleStartFromInfo}
        showStartButton={infoMode === "play"}
      />
    </div>
  );
}
