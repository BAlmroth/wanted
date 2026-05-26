import { useSound } from "../contexts/SoundContext";
import styles from "./SoundControls.module.css";
import SFX from "../assets/SFX.png";
import SFXMute from "../assets/SFXMute.png";
import Sound from "../assets/Sound.png";
import SoundMute from "../assets/SoundMute.png";

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
        <img
          src={soundtrackMuted ? SoundMute : Sound}
          alt={soundtrackMuted ? "Music muted" : "Music"}
          className={styles.icon}
        />
      </button>

      <button
        className={styles.btn}
        onClick={toggleSfx}
        aria-pressed={sfxMuted}
        aria-label={sfxMuted ? "Unmute sound effects" : "Mute sound effects"}
        title={sfxMuted ? "Unmute SFX" : "Mute SFX"}
      >
        <img
          src={sfxMuted ? SFXMute : SFX}
          alt={sfxMuted ? "SFX muted" : "SFX"}
          className={styles.icon}
        />
      </button>
    </div>
  );
}
