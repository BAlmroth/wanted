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
_sounds.soundtrack.muted = true;

function playSound(name: string) {
  const s = _sounds[name];
  if (!s) return;
  try {
    s.currentTime = 0;
    void s.play();
  } catch (e) {
  }
}

let _sfxMuted = false;
let _soundtrackMuted = true;

function setSoundtrackMuted(muted: boolean) {
  _soundtrackMuted = muted;
  try {
    _sounds.soundtrack.muted = muted;
    if (!muted) {
      void _sounds.soundtrack.play();
    }
  } catch {}
}

function setSfxMuted(muted: boolean) {
  _sfxMuted = muted;
  try {
    Object.entries(_sounds).forEach(([k, audio]) => {
      if (k === "soundtrack") return;
      audio.muted = muted;
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

export {
  playSound,
  startSoundtrack,
  stopSoundtrack,
  setSoundtrackMuted,
  setSfxMuted,
  isSoundtrackMuted,
  isSfxMuted,
};
