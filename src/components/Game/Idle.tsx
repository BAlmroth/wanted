import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { IdleProps } from "../../types/Game";
import styles from "./Idle.module.css";
import { Leaderboard } from "../Leaderboard";
import { Navigation } from "./Navigation";
import Instructions from "../Instructions";
import Info from "../Info";
import { RuneSpeech } from "../RuneSpeech";

const HAS_SEEN_INSTRUCTIONS_KEY = "wanted_has_seen_instructions";

export function Idle({ onStartGame }: IdleProps): ReactNode {
  const [isOpen, setIsOpen] = useState(false);
  const [showCautionOnly, setShowCautionOnly] = useState(false);
  const [showStartButton, setShowStartButton] = useState(false);
  const [hasSeenInstructions, setHasSeenInstructions] = useState(false);

  useEffect(() => {
    const hasSeen = localStorage.getItem(HAS_SEEN_INSTRUCTIONS_KEY) === "true";
    setHasSeenInstructions(hasSeen);
  }, []);

  const openInfoForPlay = () => {
    const showInstructionsOnly = !hasSeenInstructions;
    setShowCautionOnly(!showInstructionsOnly);
    setShowStartButton(true);
    setIsOpen(true);
    if (showInstructionsOnly) {
      localStorage.setItem(HAS_SEEN_INSTRUCTIONS_KEY, "true");
    }
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
            ariaDescribedBy="game-instructions game-caution"
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
