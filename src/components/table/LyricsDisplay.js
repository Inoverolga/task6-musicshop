import { useEffect, useRef, useState } from "react";
import { generateLyrics } from "../../generators/lyricsGenerator";

const LyricsDisplay = ({ song, currentTime, isPlaying }) => {
  const [lyrics, setLyrics] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    setLyrics(generateLyrics(song.id));
  }, [song]);

  useEffect(() => {
    if (!isPlaying || !containerRef.current) return;

    const activeIndex = lyrics.findIndex(
      (line) =>
        currentTime >= line.time && currentTime < line.time + line.duration
    );

    if (activeIndex !== -1) {
      const activeElement = containerRef.current.children[activeIndex];
      if (activeElement) {
        activeElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  }, [currentTime, isPlaying, lyrics]);

  return (
    <div className="lyrics-container">
      <h6>📝 Lyrics</h6>
      <div
        ref={containerRef}
        className="lyrics-content"
        style={{
          height: "200px",
          overflowY: "auto",
          border: "1px solid #dee2e6",
          borderRadius: "8px",
          padding: "10px",
          backgroundColor: "#f8f9fa",
        }}
      >
        {lyrics.map((line, index) => {
          const isActive =
            currentTime >= line.time && currentTime < line.time + line.duration;

          return (
            <div
              key={index}
              className="lyrics-line"
              style={{
                padding: "8px",
                margin: "4px 0",
                borderRadius: "4px",
                transition: "all 0.3s ease",
                backgroundColor: isActive ? "#e9ecef" : "transparent",
                fontWeight: isActive ? "bold" : "normal",
                color: isActive ? "#dc2626" : "#6c757d",
                borderLeft: isActive
                  ? "3px solid #dc2626"
                  : "3px solid transparent",
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
