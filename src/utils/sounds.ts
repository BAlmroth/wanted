const _sounds: Record<string, HTMLAudioElement> = {
  soundtrack: new Audio("/sounds/soundtrack.mp3"),
  correct: new Audio("/sounds/correct.mp3"),
  wrong: new Audio("/sounds/wrong.mp3"),
  gameover: new Audio("/sounds/gameover.mp3"),
  victory: new Audio("/sounds/victory.mp3"),
  press: new Audio("/sounds/press.mp3"),
};

_sounds.soundtrack.loop = true;
_sounds.soundtrack.volume = 0.5;

function playSound(name: string) {
  const s = _sounds[name];
  if (!s) return;
  try {
    s.currentTime = 0;
    void s.play();
  } catch (e) {
    // ignore play errors (autoplay policies)
  }
}

let _sfxMuted = false;
let _soundtrackMuted = false;

function setSoundtrackMuted(muted: boolean) {
  _soundtrackMuted = muted;
  try {
    _sounds.soundtrack.muted = muted;
    if (!muted) {
      // try to resume
      void _sounds.soundtrack.play();
    }
  } catch {}
}

function setSfxMuted(muted: boolean) {
  _sfxMuted = muted;
  try {
    Object.keys(_sounds).forEach((k) => {
      if (k === "soundtrack") return;
      (_sounds as any)[k].muted = muted;
    });
  } catch {}
}

function isSoundtrackMuted() {
  return _soundtrackMuted;
}

function isSfxMuted() {
  return _sfxMuted;
}

function startSoundtrack() {
  try {
    void _sounds.soundtrack.play();
  } catch (e) {
    const resume = () => {
      try {
        void _sounds.soundtrack.play();
      } catch {}
    };
    document.addEventListener("pointerdown", resume, { once: true });
    document.addEventListener("touchstart", resume, { once: true });
  }
}

function stopSoundtrack() {
  try {
    _sounds.soundtrack.pause();
    _sounds.soundtrack.currentTime = 0;
  } catch {}
}

// expose minimal globals so components can call e.g. window.playSound('press')
try {
  (globalThis as any).playSound = playSound;
  (globalThis as any).startSoundtrack = startSoundtrack;
  (globalThis as any).stopSoundtrack = stopSoundtrack;
  (globalThis as any).setSoundtrackMuted = setSoundtrackMuted;
  (globalThis as any).setSfxMuted = setSfxMuted;
  (globalThis as any).isSoundtrackMuted = isSoundtrackMuted;
  (globalThis as any).isSfxMuted = isSfxMuted;
} catch (e) {}

export {
  playSound,
  startSoundtrack,
  stopSoundtrack,
  setSoundtrackMuted,
  setSfxMuted,
  isSoundtrackMuted,
  isSfxMuted,
};
