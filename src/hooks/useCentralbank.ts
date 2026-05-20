import { useState, useEffect } from "react";
import {
  getIdentity,
  createTransaction,
  sendPayout,
} from "../utils/centralbank";
import type {
  CentralbankUser,
  Transaction,
  CentralbankError,
  ApiError,
} from "../types/CentralBank";

export function useCentralbank() {
  const [user, setUser] = useState<CentralbankUser | null>(null);
  const [identityToken, setIdentityToken] = useState<string | null>(null);
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [error, setError] = useState<CentralbankError | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("identity_token");
    history.replaceState({}, "", window.location.pathname);

    if (token) {
      setIdentityToken(token);
      getIdentity(token)
        .then(setUser)
        .catch((e: ApiError) => {
          // getIdentity is optional per the API spec, so just log it
          console.debug("getIdentity failed (optional):", e.message);
        });
    }
  }, []);

  async function startGame() {
    try {
      if (!identityToken) {
        const error: CentralbankError = { type: "TOKEN_EXPIRED" };
        setError(error);
        throw error;
      }
      const txn = await createTransaction(identityToken);
      setTransaction(txn);
      return txn.stamp;
    } catch (e) {
      const err = e as ApiError;
      if (err.status === 401) {
        setError({ type: "TOKEN_EXPIRED" });
      } else {
        setError({ type: "TRANSACTION_FAILED" });
      }
      throw e;
    }
  }

  async function endGame(levelsCleared: number) {
    try {
      if (transaction?.id) {
        await sendPayout(transaction.id, levelsCleared);
      }
    } catch (e) {
      const err = e as ApiError;
      if (err.status === 401) {
        setError({ type: "TOKEN_EXPIRED" });
      } else {
        setError({ type: "PAYOUT_FAILED" });
      }
    }
  }

  function clearError() {
    setError(null);
  }

  return { user, startGame, endGame, transaction, error, clearError };
}
