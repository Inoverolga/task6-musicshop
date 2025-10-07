import { Table as BootstrapTable, Container, Card } from "react-bootstrap";
import Pagination from "./Pagination";
import ExpandableRow from "./ExpandableRows";

const Table = ({
  songs,
  currentPage,
  onPageChange,
  expandedRow,
  setExpandedRow,
  hasMore,
  onLoadMore,
  language,
}) => {
  const handleRowToggle = (songId) => {
    setExpandedRow(expandedRow === songId ? null : songId);
  };

  return (
    <Container fluid className="px-0">
      <Card className="shadow-sm border-0">
        <Card.Body className="p-0">
          <div className="table-responsive">
            <BootstrapTable striped hover className="mb-0">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Song</th>
                  <th>Artist</th>
                  <th>Album</th>
                  <th>Genre</th>
                  <th>Likes</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                {songs.map((item) => (
                  <ExpandableRow
                    className="text-center"
                    key={item.id}
                    song={item}
                    language={language}
                    isExpanded={expandedRow === item.id}
                    onToggle={() => handleRowToggle(item.id)}
                  />
                ))}
              </tbody>
            </BootstrapTable>
          </div>
          {songs.length > 0 && (
            <Card.Footer className="bg-light px-4">
              <div className="d-flex justify-content-between align-items-center">
                <small className="text-muted">
                  Page {currentPage} • {songs.length} songs
                </small>
                <Pagination
                  currentPage={currentPage}
                  onPageChange={onPageChange}
                />
              </div>
            </Card.Footer>
          )}
          {hasMore && (
            <div className="text-center mt-3">
              <button className="btn btn-primary" onClick={onLoadMore}>
                Load More Songs
              </button>
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Table;
