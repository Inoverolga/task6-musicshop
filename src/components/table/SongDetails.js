import { useState, useEffect } from "react";
import { Row, Col, Button, Card } from "react-bootstrap";
import useMusicPlayer from "../../hooks/useMusicPlayer";
import LyricsDisplay from "./LyricsDisplay";
import useAlbumCover from "../../hooks/useAlbumCover";

const SongDetails = ({ song }) => {
  const { playPreview, stopPlayback, isPlaying, currentPlaybackTime } =
    useMusicPlayer();
  const [currentSongId, setCurrentSongId] = useState(null);
  const [review, setReview] = useState("");
  const { getAlbumCoverUrl } = useAlbumCover();

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
  useEffect(() => {
    if (!song) return;
    const reviewText = `"${song.title}" by ${
      song.artist
    } is a ${song.genre.toLowerCase()} ${
      song.album === "Single" ? "single" : "track"
    } that showcases their unique musical style.`;
    setReview(reviewText);
  }, [song]);

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
              className="album-cover p-4 text-center mt-3 ms-3 rounded d-flex flex-column justify-content-center"
              style={{
                background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
                minHeight: "200px",
              }}
            >
              <img
                src={getAlbumCoverUrl(song)}
                alt={`${song.title} cover`}
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "8px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                }}
              />
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
                <p className="text-muted">{review}</p>

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
