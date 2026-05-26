import { useSound } from "../contexts/SoundContext";
import styles from "./SoundControls.module.css";

export default function SoundControls() {
  const { soundtrackMuted, sfxMuted, toggleSoundtrack, toggleSfx } = useSound();

  return (
    <div className={styles.container}>
      <button
        className={styles.btn}
        onClick={toggleSoundtrack}
        aria-pressed={soundtrackMuted}
        aria-label={
          soundtrackMuted ? "Unmute background music" : "Mute background music"
        }
        title={soundtrackMuted ? "Unmute music" : "Mute music"}
      >
        {soundtrackMuted ? "🔈" : "🎵"}
      </button>

      <button
        className={styles.btn}
        onClick={toggleSfx}
        aria-pressed={sfxMuted}
        aria-label={sfxMuted ? "Unmute sound effects" : "Mute sound effects"}
        title={sfxMuted ? "Unmute SFX" : "Mute SFX"}
      >
        {sfxMuted ? "🔇" : "🔊"}
      </button>
    </div>
  );
}
