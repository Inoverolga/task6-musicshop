import { useState } from "react";
import { Row, Col, Button, Card } from "react-bootstrap";
import useMusicPlayer from "../../hooks/useMusicPlayer";
import LyricsDisplay from "./LyricsDisplay";

const SongDetails = ({ song }) => {
  const { playPreview, stopPlayback, isPlaying, currentPlaybackTime } =
    useMusicPlayer();
  const [currentSongId, setCurrentSongId] = useState(null);

  const handlePlay = () => {
    if (isPlaying && currentSongId === song.id) {
      stopPlayback();
    } else {
      if (isPlaying) {
        stopPlayback();
      }
      playPreview(song);
      setCurrentSongId(song.id);
    }
  };

  const generateAlbumCover = (song) => {
    const musicKeywords = [
      "music",
      "guitar",
      "piano",
      "microphone",
      "headphones",
      "vinyl",
      "concert",
      "dj",
      "singer",
      "drums",
    ];

    const keyword = musicKeywords[song.id % musicKeywords.length];
    const unsplashUrl = `https://source.unsplash.com/400x400/?${keyword}&sig=${song.id}`;

    return {
      backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${unsplashUrl})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "200px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    };
  };

  const generateReview = (song) => {
    const reviews = [
      `"${song.title}" showcases ${
        song.artist
      }'s unique ${song.genre.toLowerCase()} style.`,
      `A masterpiece from ${song.artist}! Perfect ${song.genre} composition.`,
      `This ${song.genre.toLowerCase()} track from ${
        song.artist
      } is captivating.`,
    ];
    return reviews[song.id % reviews.length];
  };

  const isThisSongPlaying = isPlaying && currentSongId === song.id;

  return (
    <Card
      className="m-3 border-0"
      style={{ boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)" }}
    >
      <Card.Body className="p-0">
        <Row className="align-items-stretch">
          <Col md={4}>
            <div
              className="album-cover rounded p-4 text-white text-center d-flex flex-column justify-content-center"
              style={generateAlbumCover(song)}
            >
              <div className="text-center">
                <div className="music-icon mb-3" style={{ fontSize: "3rem" }}>
                  {
                    [
                      "🎵",
                      "🎸",
                      "🎹",
                      "🎤",
                      "🎧",
                      "🥁",
                      "🎷",
                      "🎺",
                      "🎻",
                      "📻",
                    ][song.id % 10]
                  }
                </div>
                <h5 className="fw-bold mb-2">{song.title}</h5>
                <p className="mb-1">{song.artist}</p>
                {song.album !== "Single" && <small>{song.album}</small>}
              </div>
            </div>
          </Col>
          <Col md={8}>
            <div className="d-flex flex-column h-100 p-3">
              <div className="mb-4">
                <Button
                  variant={
                    isThisSongPlaying ? "outline-danger" : "outline-success"
                  }
                  onClick={handlePlay}
                  size="lg"
                >
                  {isThisSongPlaying
                    ? "⏹️ Stop Preview"
                    : "▶️ Play Preview with Lyrics"}
                </Button>
              </div>

              <div className="flex-grow-1">
                <h6 className="text-muted mb-2">Review</h6>
                <p className="text-muted">{generateReview(song)}</p>

                <LyricsDisplay
                  song={song}
                  currentTime={currentPlaybackTime}
                  isPlaying={isThisSongPlaying}
                />
              </div>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default SongDetails;
