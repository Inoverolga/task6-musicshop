// Импортируем компонент InfiniteScroll для реализации бесконечной прокрутки
import InfiniteScroll from "react-infinite-scroll-component";
import { BeatLoader } from "react-spinners";
import { Row, Col, Card } from "react-bootstrap";
//import "./gallery.scss";

const Gallery = ({ songs, onLoadMore, hasMore }) => {
  // - songs: массив песен для отображения
  // - onLoadMore: функция для загрузки следующих данных при прокрутке
  // - hasMore: булево значение, есть ли еще данные для загрузки

  return (
    <InfiniteScroll
      key={songs.length} // Добавляем ключ который меняется только при сбросе
      dataLength={songs.length} // Текущее количество загруженных элементов
      next={onLoadMore} // Функция, которая вызывается когда пользователь прокручивает к концу
      // Загружает следующую порцию данных
      hasMore={hasMore} // Флаг, указывающий есть ли еще данные для загрузки, Если false - показывается endMessage
      loader={
        // Компонент который показывается во время загрузки новых данных
        <div className="infinite-loader">
          <BeatLoader color="#007bff" size={15} />
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
      <Row className="g-4">
        {songs.map((song) => (
          <Col key={song.id} xs={12} sm={6} lg={4} xl={3}>
            <Card className="song-card-custom h-100">
              <div
                className="album-cover-custom"
                style={{
                  height: "200px",
                  backgroundColor: `hsl(${(song.id * 30) % 360}, 70%, 80%)`,
                  backgroundImage:
                    "linear-gradient(45deg, rgba(255,255,255,0.2) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.2) 75%, transparent 75%, transparent)",
                }}
              >
                <div className="cover-content h-100 d-flex flex-column justify-content-center text-white p-3">
                  <Card.Title className="fw-bold">{song.title}</Card.Title>
                  <Card.Text className="mb-0">{song.artist}</Card.Text>
                </div>
              </div>

              <Card.Body className="d-flex flex-column">
                <Card.Text className="text-muted small mb-3">
                  {song.album} • {song.genre}
                </Card.Text>

                <div className="mt-auto d-flex justify-content-between align-items-center">
                  <small className="text-danger">❤️ {song.likes}</small>
                  <small className="text-secondary">⏱️ {song.duration}</small>
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
