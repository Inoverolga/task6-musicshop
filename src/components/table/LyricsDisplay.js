import { useEffect, useRef, useState } from "react";
import { generateLyrics } from "../../generators/lyricsGenerator";

const LyricsDisplay = ({ song, currentTime, isPlaying, language = "en" }) => {
  const [lyrics, setLyrics] = useState([]);
  const containerRef = useRef(null);
  const lastScrollIndexRef = useRef(-1);

  useEffect(() => {
    if (song) {
      const lyrics = generateLyrics(song.id, language);
      setLyrics(lyrics);
      lastScrollIndexRef.current = -1;
    }
  }, [song, language]);

  useEffect(() => {
    if (!containerRef.current || lyrics.length === 0 || !isPlaying) return;

    const activeIndex = lyrics.findIndex((line, index) => {
      const isActive =
        currentTime >= line.time && currentTime < line.time + line.duration;
      return isActive;
    });

    if (activeIndex !== -1 && activeIndex !== lastScrollIndexRef.current) {
      const activeElement = containerRef.current.children[activeIndex];
      if (activeElement) {
        activeElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "nearest",
        });
        lastScrollIndexRef.current = activeIndex;
      }
    }
  }, [currentTime, isPlaying, lyrics]);

  if (lyrics.length === 0) {
    return (
      <div className="lyrics-container mt-3">
        <h6 className="text-muted mb-2">Lyrics</h6>
        <div className="text-muted small">No lyrics available</div>
      </div>
    );
  }

  return (
    <div className="lyrics-container mt-3">
      <h6 className="text-muted mb-2">Lyrics</h6>
      <div
        ref={containerRef}
        className="lyrics-content"
        style={{
          height: "120px",
          overflowY: "auto",
          border: "1px solid #dee2e6",
          borderRadius: "8px",
          padding: "8px",
          backgroundColor: "#f8f9fa",
        }}
      >
        {lyrics.map((line, index) => {
          const isActive =
            currentTime >= line.time && currentTime < line.time + line.duration;

          return (
            <div
              key={index}
              className={`lyrics-line ${isActive ? "active" : ""}`}
              style={{
                padding: "6px 8px",
                margin: "2px 0",
                borderRadius: "4px",
                transition: "all 0.3s ease",
                backgroundColor: "transparent",
                color: isActive ? "#040404e8" : "#495057",
                fontWeight: isActive ? "600" : "normal",
                fontSize: "14px",
              }}
            >
              {line.text}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LyricsDisplay;
