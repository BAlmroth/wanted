import { useGameLogic } from "./UseGameLogic";
import { Idle } from "./Idle";
import { GameOn } from "./GameOn";
import { GameOver } from "./GameOver";
import TokenExpired from "../../errors/TokenExpired";
import PayoutFailed from "../../errors/PayoutFailed";
import TransactionFailed from "../../errors/TransactionFailed";
import styles from "../../errors/error.module.css";

export default function Game() {
  const {
    gameState,
    currentLevel,
    targetFigure,
    characters,
    message,
    score,
    loading,
    timerRef,
    startGame,
    handleClick,
    handleTimeUp,
    transaction,
    error,
    resetToIdle,
    isWin,
    user,
  } = useGameLogic();

  if (error?.type === "TOKEN_EXPIRED") return <TokenExpired />;
  if (error?.type === "PAYOUT_FAILED")
    return (
      <PayoutFailed transactionId={transaction?.transaction_id?.toString()} />
    );
  if (error?.type === "TRANSACTION_FAILED")
    return <TransactionFailed onRetry={resetToIdle} />;

  return (
    <>
      {error && (
        <div className={styles.toast}>
          <h3>Something went wrong</h3>
          <button onClick={resetToIdle}>Try again</button>
        </div>
      )}

      {gameState === "idle" && (
        <Idle onStartGame={startGame} userName={user?.name} />
      )}
      {gameState === "playing" && (
        <GameOn
          currentLevel={currentLevel}
          targetFigure={targetFigure}
          characters={characters}
          message={message}
          score={score}
          loading={loading}
          timerRef={timerRef}
          onCharacterClick={handleClick}
          onTimeUp={handleTimeUp}
        />
      )}
      {gameState === "gameover" && (
        <GameOver
          score={score}
          currentLevel={currentLevel}
          onPlayAgain={startGame}
          transaction={transaction}
          resultType={isWin ? "win" : "gameover"}
        />
      )}
    </>
  );
}
