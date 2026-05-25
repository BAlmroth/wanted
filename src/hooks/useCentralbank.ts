import { useState, useEffect } from "react";
import {
  getIdentity,
  createTransaction,
  sendPayout,
} from "../utils/centralbank";
import { TIVOLI_MODE } from "../config";
import type {
  CentralbankUser,
  Transaction,
  CentralbankError,
  ApiError,
  Stamp,
  UseCentralbankReturn,
} from "../types/CentralBank";

export function useCentralbank(): UseCentralbankReturn {
  const [user, setUser] = useState<CentralbankUser | null>(null);
  const [identityToken, setIdentityToken] = useState<string | null>(null);
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [error, setError] = useState<CentralbankError | null>(null);

  useEffect((): void => {
    if (!TIVOLI_MODE) {
      setUser({ id: 123, name: "guest" });
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const token = params.get("identity_token");
    history.replaceState({}, "", window.location.pathname);

    if (token) {
      setIdentityToken(token);
      getIdentity(token)
        .then(setUser)
        .catch((e: ApiError) => {
          console.debug("getIdentity failed (optional):", e.message);
        });
    }
  }, []);

  async function startGame(): Promise<Stamp | null> {
    try {
      if (!TIVOLI_MODE) {
        const txn = await createTransaction("");
        setTransaction(txn);
        return txn.stamp;
      }
      if (!identityToken) {
        const cbError: CentralbankError = { type: "TOKEN_EXPIRED" };
        setError(cbError);
        throw cbError;
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

  async function endGame(levelsCleared: number): Promise<void> {
    try {
      if (transaction?.transaction_id) {
        await sendPayout(transaction.transaction_id.toString(), levelsCleared);
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

  function clearError(): void {
    setError(null);
  }

  return { user, startGame, endGame, transaction, error, clearError };
}
