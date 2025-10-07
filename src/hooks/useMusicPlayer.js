import { useState, useCallback, useRef, useEffect } from "react";
import * as Tone from "tone";
import { Scale } from "tonal";

const useMusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPlaybackTime, setCurrentPlaybackTime] = useState(0);
  const synthRef = useRef(null);
  const sequenceRef = useRef(null);
  const currentSongRef = useRef(null);
  const startTimeRef = useRef(0);

  const generateMusicConfig = (seed) => {
    const noteNames = ["C", "D", "E", "F", "G", "A", "B"];
    const scaleTypes = ["major", "minor", "pentatonic", "dorian", "mixolydian"];

    const root = noteNames[seed % noteNames.length];
    const scaleType = scaleTypes[(seed * 7) % scaleTypes.length];
    const noteCount = 6 + (seed % 6); // 6-11 нот

    const scale = Scale.get(`${root} ${scaleType}`).notes;

    const melody = [];
    for (let i = 0; i < noteCount; i++) {
      const noteIndex = (seed + i * 3) % scale.length;
      const octave = 3 + ((seed + i) % 3);
      melody.push(scale[noteIndex] + octave);
    }

    return {
      melody,
      duration: 8.0,
      noteDuration: 0.3 + (seed % 10) * 0.02,
    };
  };

  const stopPlayback = useCallback(() => {
    if (sequenceRef.current) {
      sequenceRef.current.stop();
    }
    Tone.getTransport().stop();
    Tone.getTransport().cancel();

    if (synthRef.current) {
      synthRef.current.dispose();
      synthRef.current = null;
    }

    setCurrentPlaybackTime(0);
    startTimeRef.current = 0;
    currentSongRef.current = null;
    setIsPlaying(false);
  }, []);

  const playPreview = useCallback(
    async (song) => {
      if (isPlaying && currentSongRef.current === song.id) {
        stopPlayback();
        return;
      }

      try {
        await Tone.start();

        if (isPlaying) {
          stopPlayback();
        }

        currentSongRef.current = song.id;
        setIsPlaying(true);
        setCurrentPlaybackTime(0);

        const synth = new Tone.PolySynth(Tone.Synth).toDestination();
        synthRef.current = synth;

        const musicConfig = generateMusicConfig(song.id);
        const { melody, noteDuration } = musicConfig;

        const part = new Tone.Part(
          (time, note) => {
            synth.triggerAttackRelease(note, noteDuration, time);
            const elapsed = time - startTimeRef.current;
            setCurrentPlaybackTime(elapsed);
          },
          melody.map((note, index) => [index * 0.5, note])
        );

        sequenceRef.current = part;
        startTimeRef.current = Tone.now();

        Tone.getTransport().start();
        part.start(0);

        const interval = setInterval(() => {
          if (isPlaying && currentSongRef.current === song.id) {
            const elapsed = Tone.getTransport().seconds;
            setCurrentPlaybackTime(elapsed);
          }
        }, 100);

        setTimeout(() => {
          if (currentSongRef.current === song.id) {
            clearInterval(interval);
            stopPlayback();
          }
        }, musicConfig.duration * 1000);

        return () => clearInterval(interval);
      } catch (error) {
        console.error("Error playing preview:", error);
        stopPlayback();
      }
    },
    [isPlaying, stopPlayback]
  );

  useEffect(() => {
    return () => {
      stopPlayback();
    };
  }, [stopPlayback]);

  return {
    playPreview,
    stopPlayback,
    isPlaying,
    currentPlaybackTime,
  };
};

export default useMusicPlayer;
