import { useState, useEffect } from "react";
import { fetchSongs } from "./services/api";
import { Container } from "react-bootstrap";
import Toolbar from "./components/toolbar/Toolbar.js";
import Table from "./components/table/Table.js";
import Gallery from "./components/gallery/Gallery.js";
import { BeatLoader } from "react-spinners";
import "./app.scss";

function App() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewStyle, setViewMode] = useState("table");
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [expandedRow, setExpandedRow] = useState(null);
  const [galleryKey, setGalleryKey] = useState(0);
  const [params, setParams] = useState({
    language: "en",
    seed: 123456,
    limit: 10,
    averageQuantityLikes: 5,
  });

  useEffect(() => {
    if (viewStyle === "gallery") {
      window.scrollTo(0, 0);
    }
  }, [params, viewStyle]);

  useEffect(() => {
    const loadSongs = async () => {
      setLoading(true);
      try {
        const songsData = await fetchSongs({
          ...params,
          page: currentPage,
        });

        if (viewStyle === "gallery" && currentPage > 1) {
          setSongs((prev) => [...prev, ...songsData]);
        } else {
          setSongs(songsData);
        }

        setHasMore(songsData.length === params.limit);
      } catch (error) {
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    };

    loadSongs();
  }, [params, currentPage, viewStyle]);

  const handleLoadMore = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
    setCurrentPage(1);
    setHasMore(true);
    setExpandedRow(null);
    setGalleryKey((prev) => prev + 1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    setExpandedRow(null);
  };

  const handleParamsChange = (newParams) => {
    setParams(newParams);

    setCurrentPage(1);
    setExpandedRow(null);
    setHasMore(true);
    setGalleryKey((prev) => prev + 1);
  };

  const visiblePagesForTable = hasMore ? currentPage + 5 : currentPage;
  return (
    <div className="App music-app">
      <Container fluid="lg">
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold gradient-title">🎵 Music Shop</h1>
          <p className="lead text-muted">Discover your next favorite song</p>
        </div>

        <div className="sticky-top bg-white shadow-sm mb-3">
          <Toolbar
            params={params}
            setParams={handleParamsChange}
            viewMode={viewStyle}
            onViewModeChange={handleViewModeChange}
          />
        </div>

        {loading && songs.length === 0 ? (
          <div className="text-center py-5">
            <BeatLoader color="#6f42c1" size={15} />
            <p className="mt-3 text-muted">Loading songs...</p>
          </div>
        ) : viewStyle === "table" ? (
          <Table
            songs={songs}
            currentPage={currentPage}
            totalPages={visiblePagesForTable}
            onPageChange={handlePageChange}
            expandedRow={expandedRow}
            setExpandedRow={setExpandedRow}
            language={params.language}
          />
        ) : (
          <Gallery
            key={galleryKey}
            songs={songs}
            onLoadMore={handleLoadMore}
            hasMore={hasMore}
            language={params.language}
          />
        )}
      </Container>
    </div>
  );
}

export default App;
