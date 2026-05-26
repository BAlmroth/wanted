import { useState } from "react";
import type { GameOverProps } from "../../types/Game";
import styles from "./GameOver.module.css";
import { Leaderboard } from "../Leaderboard";
import { Navigation } from "./Navigation";
import Info from "../Info";
import { calculatePayout } from "../../utils/gameUtils";
import { RuneSpeech } from "../RuneSpeech";

export function GameOver({
  score,
  currentLevel: _currentLevel,
  onPlayAgain,
  transaction,
  resultType = "gameover",
}: GameOverProps) {
  const [infoMode, setInfoMode] = useState<null | "play" | "info">(null);

  const openInfoForPlay = (): void => setInfoMode("play");
  const openInfo = (): void => setInfoMode("info");
  const handleStartFromInfo = (): void => {
    setInfoMode(null);
    onPlayAgain();
  };
  const euro = calculatePayout(score);

  const stampImageUrl = transaction?.stamp?.image_url?.replace(
    /^http:\/\//,
    "https://",
  );

  const containerClassName =
    resultType === "win" ? styles.winContainer : styles.overContainer;

  return (
    <div className={containerClassName}>
      {resultType === "win" ? (
        <h1 className={styles.titleWinner}>
          {"WINNER".split("").map((l: string, i: number) => (
            <span key={i}>{l}</span>
          ))}
        </h1>
      ) : (
        <h1 className={styles.titleGameOver}>
          {"GAME OVER".split("").map((l: string, i: number) => (
            <span
              key={i}
              style={
                l === " "
                  ? { display: "inline-block", width: "0.4em" }
                  : undefined
              }
            >
              {l}
            </span>
          ))}
        </h1>
      )}

      <div
        className={
          resultType === "win" ? styles.pageContent : styles.pageContentGameover
        }
      >
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
                <img
                  className={styles.stamp}
                  src={stampImageUrl}
                  alt="Your stamp"
                />
              )}
            </div>
          </div>

          <Leaderboard />
        </section>

        {/* out commented Nav and wrote it without play again button, will be changed if tvoli choose to have the functionality yo play again, right now you have to go back to loopland for play again */}
        {/* <Navigation onStartGame={openInfoForPlay} onInfoClick={openInfo} /> */}
        <Navigation
          onStartGame={openInfoForPlay}
          onInfoClick={openInfo}
          showPlayButton={false}
        />
      </div>

      <Info
        isOpen={infoMode !== null}
        onClose={(): void => setInfoMode(null)}
        onStartGame={handleStartFromInfo}
        showStartButton={infoMode === "play"}
      />
      <RuneSpeech variant={resultType === "win" ? "winner" : "gameover"} />
    </div>
  );
}
