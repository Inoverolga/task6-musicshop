import { useState, useEffect } from "react";
import { fetchSongs } from "./services/api";
import { Container } from "react-bootstrap";
import Toolbar from "./components/toolbar/Toolbar.js";
import Table from "./components/table/Table.js";
import Gallery from "./components/gallery/Gallery.js";
import { BeatLoader } from "react-spinners";
import "./app.scss";

function App() {
  const [songs, setSongs] = useState([]); // Состояние для хранения массива песен, полученных с сервера
  const [loading, setLoading] = useState(false);
  const [viewStyle, setViewMode] = useState("table"); // 'table' или 'gallery'
  const [currentPage, setCurrentPage] = useState(1); // Единая пагинация
  const [hasMore, setHasMore] = useState(true);
  const [averageQuantityLikes, setAverageQuantityLikes] = useState(5); //state для лайков
  const [expandedRow, setExpandedRow] = useState(null); //  состояние для отслеживания раскрытой строки
  const [params, setParams] = useState({
    // Состояние для хранения параметров запроса к API
    language: "en", // Язык данных (по умолчанию английский)
    seed: 123456, // Базовое значение для детерминированной генерации
    limit: 10, // Песен на странице
  });

  // Для Table- расчет страниц на основе ID
  const totalPages = Math.ceil(30 / params.limit);

  // 🔥 ДОБАВЬ ЭТУ ФУНКЦИЮ ДЛЯ ОБНОВЛЕНИЯ ЛАЙКОВ
  const handleAverageQuantityLikesChange = (newValue) => {
    setAverageQuantityLikes(newValue);
    // Также сбрасываем страницу при изменении лайков
    setCurrentPage(1);
    setHasMore(true);
  };

  // Загружаем песни при изменении параметров или режима просмотров
  useEffect(() => {
    // Хук useEffect для выполнения побочных эффектов (загрузка данных)
    // Срабатывает при каждом изменении params (зависимость [params])
    const loadSongs = async () => {
      setLoading(true);
      try {
        const songsData = await fetchSongs({
          ...params,
          page: currentPage,
          averageQuantityLikes: averageQuantityLikes,
        });

        console.log("📤 Sending to backend:", {
          averageQuantityLikes: averageQuantityLikes,
          type: typeof averageQuantityLikes,
        });
        if (viewStyle === "gallery" && currentPage > 1) {
          // Для галереи при дозагрузке - ДОБАВЛЯЕМ песни
          setSongs((prev) => [...prev, ...songsData]);
        } else {
          // Для таблицы ИЛИ первой загрузки - ЗАМЕНЯЕМ песни
          setSongs(songsData);
        }

        // Проверяем, есть ли еще данные
        setHasMore(songsData.length === params.limit);
      } catch (error) {
        setHasMore(false);
        console.error("Failed to load songs:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSongs();
  }, [params, currentPage, viewStyle, averageQuantityLikes]);

  // Загрузка дополнительных песен для GalleryView (бесконечный скролл)
  // Загрузка дополнительных песен для Gallery (не меняем params!)
  const handleLoadMore = () => {
    setCurrentPage((prev) => prev + 1);
  };

  // Смена режима просмотра (Table ↔ Gallery)
  const handleViewModeChange = (mode) => {
    setViewMode(mode);
    // Сбрасываем страницы при смене режима
    // Сбрасываем страницы при смене режима
    setCurrentPage(1);
    setHasMore(true);
    setExpandedRow(null); //закрыть раскрытые строки
  };

  // Обработчик смены страницы
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Обработчик изменения параметров из тулбара
  const handleParamsChange = (newParams) => {
    setParams(newParams);
    // Сбрасываем страницы при изменении параметров
    setCurrentPage(1);
    setExpandedRow(null); // закрыть раскрытые строки
    setHasMore(true);
  };
  return (
    <div className="App music-app">
      <Container fluid="lg">
        {/* Уникальный заголовок */}
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold gradient-title">🎵 Music Shop</h1>
          <p className="lead text-muted">Discover your next favorite song</p>
        </div>

        <Toolbar
          params={params}
          setParams={handleParamsChange}
          viewMode={viewStyle}
          onViewModeChange={handleViewModeChange}
          onAverageQuantityLikesChange={handleAverageQuantityLikesChange} // ← ДОБАВЬ
          averageQuantityLikes={averageQuantityLikes} // ← ДОБАВЬ
        />

        {loading && songs.length === 0 ? (
          <div className="text-center py-5">
            <BeatLoader color="#6f42c1" size={15} />
            <p className="mt-3 text-muted">Loading songs...</p>
          </div>
        ) : viewStyle === "table" ? (
          <Table
            songs={songs}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            expandedRow={expandedRow}
            setExpandedRow={setExpandedRow}
          />
        ) : (
          <Gallery
            songs={songs}
            onLoadMore={handleLoadMore}
            hasMore={hasMore}
          />
        )}
      </Container>
    </div>
  );
}

export default App;
