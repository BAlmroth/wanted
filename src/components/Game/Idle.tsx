import { useState } from "react";
import type { ReactNode } from "react";
import type { IdleProps } from "../../types/Game";
import styles from "./Idle.module.css";
import { Leaderboard } from "../Leaderboard";
import { Navigation } from "./Navigation";
import Instructions from "../Instructions";
import Info from "../Info";
import { RuneSpeech } from "../RuneSpeech";

export function Idle({ onStartGame, userName }: IdleProps): ReactNode {
  const [isOpen, setIsOpen] = useState(false);
  const [showCautionOnly, setShowCautionOnly] = useState(false);
  const [showStartButton, setShowStartButton] = useState(false);

  const openInfoForPlay = () => {
    setShowCautionOnly(!!userName);
    setShowStartButton(true);
    setIsOpen(true);
  };

  const openInfo = () => {
    setShowCautionOnly(false);
    setShowStartButton(false);
    setIsOpen(true);
  };

  const handleStartGame = () => {
    setIsOpen(false);
    onStartGame();
  };

  return (
    <>
      <div className={styles.idleContainer}>
        <div className={styles.titleWrap}>
          <h1>WANTED</h1>
          <h2>
            AT <span className={styles.yrgo}>YRGO</span>!
          </h2>
        </div>

        <div className={styles.pageContent}>
          <section className={styles.infoBoxes}>
            <Instructions />
            <Leaderboard />
          </section>
          <Navigation
            onStartGame={openInfoForPlay}
            onInfoClick={openInfo}
          />
        </div>
      </div>

      <RuneSpeech />

      <Info
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onStartGame={handleStartGame}
        showStartButton={showStartButton}
        showCautionOnly={showCautionOnly}
      />
    </>
  );
}
