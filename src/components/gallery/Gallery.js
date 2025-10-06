// Импортируем компонент InfiniteScroll для реализации бесконечной прокрутки
import InfiniteScroll from "react-infinite-scroll-component";
import { BeatLoader } from "react-spinners";
import { Row, Col, Card } from "react-bootstrap";

//import "./gallery.scss";

const Gallery = ({ songs, onLoadMore, hasMore }) => {
  // - songs: массив песен для отображения
  // - onLoadMore: функция для загрузки следующих данных при прокрутке
  // - hasMore: булево значение, есть ли еще данные для загрузки
  // Функция для получения красивой обложки с Unsplash
  const getAlbumCover = (song) => {
    const musicThemes = [
      "album-cover",
      "vinyl-record",
      "music-production",
      "concert",
      "music-studio",
      "guitar",
      "piano",
      "drums",
      "microphone",
      "headphones",
      "dj",
      "singer",
      "band-performance",
      "jazz-club",
      "rock-concert",
      "hip-hop",
      "electronic-music",
      "classical-music",
    ];

    const theme = musicThemes[song.id % musicThemes.length];
    return `https://source.unsplash.com/600x600/?${theme}&music&sig=${song.id}`;
  };

  // Функция для получения музыкальной иконки
  const getMusicIcon = (songId) => {
    const icons = ["🎵", "🎸", "🎹", "🎤", "🎧", "🥁", "🎷", "🎺", "🎻", "📻"];
    return icons[songId % icons.length];
  };

  return (
    <InfiniteScroll
      dataLength={songs.length} // Текущее количество загруженных элементов
      next={onLoadMore} // Функция, которая вызывается когда пользователь прокручивает к концу
      // Загружает следующую порцию данных
      hasMore={hasMore} // Флаг, указывающий есть ли еще данные для загрузки, Если false - показывается endMessage
      loader={
        // Компонент который показывается во время загрузки новых данных
        <div className="infinite-loader">
          <BeatLoader color="#dc2626" size={15} />
          <h4>Loading more songs...</h4>
        </div>
      }
      // Сообщение которое показывается когда все данные загружены
      endMessage={
        <div className="infinite-end">
          <p>🎉 You've reached the end! No more songs.</p>
        </div>
      }
      // Порог срабатывания загрузки (в долях от высоты контейнера)
      // 0.8 = загрузка начнется когда до конца останется 80% высоты видимой области
      scrollThreshold={0.8}
    >
      <Row className="g-3">
        {songs.map((song, index) => (
          <Col key={song.id} xs={12} sm={6} lg={4} xl={3}>
            <Card
              className="h-100 shadow-sm border-0"
              style={{
                background: "linear-gradient(135deg, #fef2f2 0%, #f0fdf4 100%)",
                backdropFilter: "blur(10px)",
              }}
            >
              {/* Порядковый номер в левом верхнем углу */}
              <div className="position-absolute top-0 start-0 m-2 z-3">
                <span
                  className="badge"
                  style={{
                    backgroundColor: "#1e293b",
                    color: "white",
                    fontSize: "0.75rem",
                  }}
                >
                  #{index + 1}
                </span>
              </div>

              {/* Иконка инструмента в правом верхнем углу */}
              <div
                className="position-absolute top-0 end-0 m-2 z-3"
                style={{
                  fontSize: "3.5rem",
                  opacity: 0.9,
                  filter: "drop-shadow(1px 1px 2px rgba(0,0,0,0.3))",
                }}
              >
                {getMusicIcon(song.id)}
              </div>

              {/* Красивая обложка с Unsplash */}
              <div
                className="album-cover-custom position-relative"
                style={{
                  height: "160px",
                  backgroundImage: `linear-gradient(rgba(226, 223, 223, 0.91), rgba(39, 38, 38, 0.3)), url(${getAlbumCover(
                    song
                  )})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderBottom: "1px solid #dee2e6",
                }}
              >
                {/* Текст поверх обложки */}
                <div className="position-absolute bottom-0 start-0 w-100 p-3">
                  <Card.Title
                    className="fw-bold mb-1 text-dark"
                    style={{ fontSize: "1rem" }}
                  >
                    {song.title}
                  </Card.Title>
                  <Card.Text
                    className="mb-0 text-dark"
                    style={{ fontSize: "0.8rem" }}
                  >
                    {song.artist}
                  </Card.Text>
                </div>
              </div>

              {/* Тело карточки */}
              <Card.Body className="d-flex flex-column p-3">
                <div className="mb-2">
                  <Card.Text
                    className="small mb-1"
                    style={{ color: "#475569" }}
                  >
                    <strong>Album:</strong> {song.album}
                  </Card.Text>
                  <Card.Text
                    className="small mb-2"
                    style={{ color: "#475569" }}
                  >
                    <strong>Genre:</strong> {song.genre}
                  </Card.Text>
                </div>

                <div className="mt-auto d-flex justify-content-between align-items-center pt-2 border-top">
                  <small className="fw-bold" style={{ color: "#b91c1c" }}>
                    ❤️ {song.likes}
                  </small>
                  <small style={{ color: "#64748b" }}>⏱️ {song.duration}</small>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </InfiniteScroll>
  );
};

export default Gallery;
