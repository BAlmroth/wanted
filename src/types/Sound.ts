export type SoundApi = {
  soundtrackMuted: boolean;
  sfxMuted: boolean;
  toggleSoundtrack: () => void;
  toggleSfx: () => void;
  play: (name: string) => void;
};
