import { useState, useCallback, useRef, useEffect } from "react";
import * as Tone from "tone";
import { Scale, Chord } from "tonal";

const useMusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const synthRef = useRef(null);
  const drumRef = useRef(null);
  const bassRef = useRef(null);
  const sequenceRef = useRef(null);
  const currentSongRef = useRef(null);

  const createMelody = (seed) => {
    const scales = [
      "C major",
      "G major",
      "D minor",
      "A minor",
      "F major",
      "E minor",
    ];
    const scaleName = scales[seed % scales.length];
    const scale = Scale.get(scaleName).notes;

    const progressions = [
      [0, 3, 4, 5], // I-IV-V-vi
      [0, 4, 5, 3], // I-V-vi-IV
      [5, 3, 0, 4], // vi-IV-I-V
    ];
    const progression = progressions[seed % progressions.length];

    const melody = [];
    const patternLength = 8;

    for (let i = 0; i < patternLength; i++) {
      const chordDegree = progression[i % progression.length];
      const chordNotes = Chord.get(scale[chordDegree] + " major").notes;
      const noteIndex = (seed + i) % chordNotes.length;
      const octave = 4 + Math.floor((seed + i * 2) % 3);
      melody.push(chordNotes[noteIndex] + octave);
    }

    return { melody, scaleName };
  };

  const createDrumPattern = (seed) => {
    const patterns = [
      ["C2", null, "C2", null, "C2", null, "C2", null],
      ["C2", null, null, "C2", "C2", null, null, "C2"],
      [null, "C2", null, "C2", null, "C2", null, "C2"],
    ];
    return patterns[seed % patterns.length];
  };

  const stopPlayback = useCallback(() => {
    console.log("🛑 Stopping playback");

    // Останавливаем все последовательности
    if (sequenceRef.current) {
      sequenceRef.current.melodySequence?.stop();
      sequenceRef.current.drumSequence?.stop();
      sequenceRef.current.bassSequence?.stop();
      sequenceRef.current = null;
    }

    // Останавливаем Transport
    Tone.Transport.stop();
    Tone.Transport.cancel();

    // Уничтожаем синтезаторы
    if (synthRef.current) {
      synthRef.current.dispose();
      synthRef.current = null;
    }
    if (drumRef.current) {
      drumRef.current.dispose();
      drumRef.current = null;
    }
    if (bassRef.current) {
      bassRef.current.dispose();
      bassRef.current = null;
    }

    currentSongRef.current = null;
    setIsPlaying(false);
  }, []);

  const playPreview = useCallback(
    async (song) => {
      if (isPlaying) {
        stopPlayback();
        return;
      }

      try {
        console.log("🎵 Starting playback for song:", song.id);
        if (Tone.context.state !== "running") {
          await Tone.context.resume();
        }
        await Tone.start();

        currentSongRef.current = song.id;
        setIsPlaying(true);

        // Создаем разные инструменты
        const synth = new Tone.PolySynth(Tone.Synth).toDestination();
        const drum = new Tone.MembraneSynth().toDestination();
        const bass = new Tone.MonoSynth({
          oscillator: { type: "sawtooth" },
          filter: { Q: 2, frequency: 200 },
        }).toDestination();

        synthRef.current = synth;
        drumRef.current = drum;
        bassRef.current = bass;

        // Генерируем мелодию и паттерны
        const { melody } = createMelody(song.id);
        const drumPattern = createDrumPattern(song.id + 1000);

        console.log("✅ Now playing:", melody);

        // Создаем последовательности
        const melodySequence = new Tone.Sequence(
          (time, note) => {
            if (note) synth.triggerAttackRelease(note, "0.3", time);
          },
          melody,
          "0.5n"
        );

        const drumSequence = new Tone.Sequence(
          (time, note) => {
            if (note) drum.triggerAttackRelease(note, "0.1", time);
          },
          drumPattern,
          "0.25n"
        );

        const bassSequence = new Tone.Sequence(
          (time, i) => {
            if (melody[i]) {
              const bassNote = melody[i].slice(0, -1) + "2";
              bass.triggerAttackRelease(bassNote, "0.4", time);
            }
          },
          [0, 2, 4, 6],
          "1n"
        );

        // Запускаем последовательности
        Tone.Transport.start();
        melodySequence.start();
        drumSequence.start();
        bassSequence.start();

        sequenceRef.current = { melodySequence, drumSequence, bassSequence };

        // Авто-стоп через 8 секунд
        setTimeout(() => {
          if (currentSongRef.current === song.id) {
            stopPlayback();
          }
        }, 8000);
      } catch (error) {
        console.error("❌ Error playing preview:", error);
        stopPlayback();
      }
    },
    [isPlaying, stopPlayback]
  );

  // Очистка при размонтировании
  useEffect(() => {
    return () => {
      stopPlayback();
    };
  }, [stopPlayback]);

  return {
    playPreview,
    stopPlayback,
    isPlaying,
  };
};

export default useMusicPlayer;
