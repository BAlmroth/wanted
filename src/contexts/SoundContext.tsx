import React, { createContext, useContext, useEffect, useState } from "react";
import {
  startSoundtrack,
  playSound,
  setSoundtrackMuted,
  setSfxMuted,
  isSoundtrackMuted,
  isSfxMuted,
} from "../utils/sounds";

type SoundApi = {
  soundtrackMuted: boolean;
  sfxMuted: boolean;
  toggleSoundtrack: () => void;
  toggleSfx: () => void;
  play: (name: string) => void;
};

const SoundContext = createContext<SoundApi | null>(null);

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [soundtrackMuted, setSoundtrackMutedState] = useState<boolean>(() => {
    try {
      return isSoundtrackMuted();
    } catch {
      return false;
    }
  });
  const [sfxMuted, setSfxMutedState] = useState<boolean>(() => {
    try {
      return isSfxMuted();
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      startSoundtrack();
    } catch {}

    const handler = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const btn = target.closest
        ? target.closest('button, [role="button"]')
        : null;
      if (btn) {
        try {
          playSound("press");
        } catch {}
      }
    };

    document.addEventListener("click", handler, { capture: true });
    return () =>
      document.removeEventListener("click", handler, { capture: true });
  }, []);

  const toggleSoundtrack = () => {
    const next = !soundtrackMuted;
    try {
      setSoundtrackMuted(next);
    } catch {}
    setSoundtrackMutedState(next);
    if (!next) {
      try {
        startSoundtrack();
      } catch {}
    }
  };

  const toggleSfx = () => {
    const next = !sfxMuted;
    try {
      setSfxMuted(next);
    } catch {}
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

export function useSound() {
  const ctx = useContext(SoundContext);
  if (!ctx) throw new Error("useSound must be used inside SoundProvider");
  return ctx;
}

export default SoundContext;
