import { useEffect, useRef, useState } from "react";

function MusicPlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const streamUrl =
    "https://relaxing-piano.stream.laut.fm/relaxing-piano";

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.volume = 0.12;

    const updateMusicState = (playing) => {
      setIsPlaying(playing);

      window.dispatchEvent(
        new CustomEvent("musicStateChange", {
          detail: playing,
        })
      );
    };

    const startMusic = () => {
      audio
        .play()
        .then(() => {
          updateMusicState(true);
        })
        .catch(() => {});
    };

    const toggleMusic = () => {
      if (audio.paused) {
        audio
          .play()
          .then(() => {
            updateMusicState(true);
          })
          .catch(() => {});
      } else {
        audio.pause();
        updateMusicState(false);
      }
    };

    window.addEventListener("click", startMusic, { once: true });
    window.addEventListener("toggleMusic", toggleMusic);

    return () => {
      window.removeEventListener("click", startMusic);
      window.removeEventListener("toggleMusic", toggleMusic);
    };
  }, []);

  return (
    <audio
      ref={audioRef}
      src={streamUrl}
      loop
    />
  );
}

export default MusicPlayer;