import React, { createContext, useContext, useEffect, useState } from "react";
import {
  startSoundtrack,
  playSound,
  setSoundtrackMuted,
  setSfxMuted,
  isSoundtrackMuted,
  isSfxMuted,
} from "../utils/sounds";
import type { SoundApi } from "../types/Sound";

const SoundContext = createContext<SoundApi | null>(null);

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [soundtrackMuted, setSoundtrackMutedState] = useState<boolean>(() => {
    try {
      return isSoundtrackMuted();
    } catch (err) {
      console.warn(
        "[Sound] Failed to get soundtrack muted state:",
        err instanceof Error ? err.message : String(err),
      );
      return false;
    }
  });
  const [sfxMuted, setSfxMutedState] = useState<boolean>(() => {
    try {
      return isSfxMuted();
    } catch (err) {
      console.warn(
        "[Sound] Failed to get SFX muted state:",
        err instanceof Error ? err.message : String(err),
      );
      return false;
    }
  });

  useEffect((): (() => void) => {
    try {
      startSoundtrack();
    } catch (err) {
      console.warn(
        "[Sound] Failed to start soundtrack:",
        err instanceof Error ? err.message : String(err),
      );
    }

    const handler = (e: Event): void => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const btn = target.closest
        ? target.closest('button, [role="button"]')
        : null;
      if (btn) {
        try {
          playSound("press");
        } catch (err) {
          console.warn(
            "[Sound] Failed to play press sound:",
            err instanceof Error ? err.message : String(err),
          );
        }
      }
    };

    document.addEventListener("click", handler, { capture: true });
    return () =>
      document.removeEventListener("click", handler, { capture: true });
  }, []);

  const toggleSoundtrack = (): void => {
    const next = !soundtrackMuted;
    try {
      setSoundtrackMuted(next);
    } catch (err) {
      console.warn(
        "[Sound] Failed to set soundtrack muted state:",
        err instanceof Error ? err.message : String(err),
      );
    }
    setSoundtrackMutedState(next);
    if (!next) {
      try {
        startSoundtrack();
      } catch (err) {
        console.warn(
          "[Sound] Failed to restart soundtrack:",
          err instanceof Error ? err.message : String(err),
        );
      }
    }
  };

  const toggleSfx = (): void => {
    const next = !sfxMuted;
    try {
      setSfxMuted(next);
    } catch (err) {
      console.warn(
        "[Sound] Failed to set SFX muted state:",
        err instanceof Error ? err.message : String(err),
      );
    }
    setSfxMutedState(next);
  };

  const api: SoundApi = {
    soundtrackMuted,
    sfxMuted,
    toggleSoundtrack,
    toggleSfx,
    play: playSound,
  };

  return <SoundContext.Provider value={api}>{children}</SoundContext.Provider>;
}

export function useSound(): SoundApi {
  const ctx = useContext(SoundContext);
  if (!ctx) throw new Error("useSound must be used inside SoundProvider");
  return ctx;
}

export default SoundContext;
