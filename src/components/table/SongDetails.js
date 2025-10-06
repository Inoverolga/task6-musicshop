import { useState } from "react";
import { Row, Col, Button, Card } from "react-bootstrap";
import useMusicPlayer from "../../hooks/useMusicPlayer";

const SongDetails = ({ song }) => {
  const { playPreview, stopPlayback, isPlaying } = useMusicPlayer();
  // playPreview - функция для начала воспроизведения
  // stopPlayback - функция для остановки воспроизведения
  // isPlaying - состояние, указывающее играет ли музыка сейчас
  const [currentSongId, setCurrentSongId] = useState(null); // Состояние для отслеживания какой трек сейчас играет

  const handlePlay = () => {
    // Обработчик клика по кнопке воспроизведения/остановки
    if (isPlaying && currentSongId === song.id) {
      // Обработчик клика по кнопке воспроизведения/остановки
      stopPlayback();
    } else {
      // Остановить текущее воспроизведение если играет другая песня
      if (isPlaying) {
        stopPlayback();
      }
      playPreview(song); // Иначе начинаем воспроизведение текущей песни
      setCurrentSongId(song.id); // Запоминаем ID текущей играющей песни
    }
  };

  const generateAlbumCover = (song) => {
    //Функция генерации стилей для обложки альбома:
    const hue = (song.id * 30) % 360;
    return {
      background: `linear-gradient(135deg, 
      hsl(${hue}, 70%, 60%) 0%, 
      hsl(${hue + 30}, 80%, 40%) 100%)`,
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
      minHeight: "200px",
      position: "relative",
      overflow: "hidden",
    };
  };

  const generateReview = (song) => {
    // Функция генерации текста ревью:
    const reviews = [
      `"${song.title}" is an incredible track that showcases ${
        song.artist
      }'s unique style. The ${song.genre.toLowerCase()} elements blend perfectly with the melodic structure.`,
      `A masterpiece from ${song.artist}! ${song.title} demonstrates why they're one of the most innovative artists in the ${song.genre} scene.`,
      `This ${song.genre.toLowerCase()} gem from ${song.artist}'s ${
        song.album === "Single" ? "latest release" : song.album
      } is absolutely captivating.`,
    ];
    return reviews[song.id % reviews.length];
  };

  // Проверяем, играет ли сейчас именно эта песня
  const isThisSongPlaying = isPlaying && currentSongId === song.id;
  // Если играет песня #5, то только у нее будет "Stop Preview",
  // а у остальных - "Play Preview"

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
                <h5 className="fw-bold mb-2 text-shadow">{song.title}</h5>
                <p className="mb-1 text-shadow">{song.artist}</p>
                {song.album !== "Single" && (
                  <small className="opacity-90 text-shadow">{song.album}</small>
                )}
              </div>
            </div>
          </Col>
          <Col md={8}>
            <div className="d-flex flex-column h-100">
              <div className="mb-4">
                <Button
                  variant={
                    isThisSongPlaying ? "outline-danger" : "outline-success"
                  }
                  size="lg"
                  onClick={handlePlay}
                >
                  {isThisSongPlaying ? "⏹️ Stop Preview" : "▶️ Play Preview"}
                </Button>
              </div>
              <div className="flex-grow-1">
                <h6 className="text-muted mb-3">Review</h6>
                <p className="text-muted lh-base">{generateReview(song)}</p>
              </div>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default SongDetails;

//Текст ревью (Review Text) - это текст музыкального обзора или отзыва о песне, который генерируется автоматически для каждой композиции.
