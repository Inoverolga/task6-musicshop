import { useState } from "react";
import { Table as BootstrapTable, Container, Card } from "react-bootstrap";
import Pagination from "./Pagination";
import ExpandableRow from "./ExpandableRows";

const Table = ({
  songs,
  currentPage,
  totalPages,
  onPageChange,
  expandedRow,
  setExpandedRow,
}) => {
  //songs - это массив песен, который приходит из API (бэкенда). для одной страницы
  // т.е. когда отправили запрос через axios, получили response.data
  //     [
  //   { id: 1, song: "Electric Dreams", artist: "John Doe", ... },
  //   { id: 2, song: "Summer Rain", artist: "Jane Smith", ... },
  //    ...
  // ]

  const handleRowToggle = (songId) => {
    setExpandedRow(expandedRow === songId ? null : songId);
  };

  return (
    <Container fluid>
      <Card className="shadow-sm">
        <Card.Body className="p-0">
          <div className="table-responsive">
            <BootstrapTable striped hover className="mb-0">
              <thead className="table-dark">
                <tr>
                  <th className="ps-4">#</th>
                  <th>Song</th>
                  <th>Artist</th>
                  <th>Album</th>
                  <th>Genre</th>
                  <th className="text-center">Likes</th>
                  <th className="text-center">Duration</th>
                </tr>
              </thead>
              <tbody>
                {songs.map((item) => (
                  <ExpandableRow
                    key={item.id}
                    song={item}
                    isExpanded={expandedRow === item.id}
                    onToggle={() => handleRowToggle(item.id)}
                  />
                ))}
              </tbody>
            </BootstrapTable>
          </div>

          {songs.length > 0 && (
            <Card.Footer className="bg-light">
              <div className="d-flex justify-content-between align-items-center">
                <small className="text-muted">
                  Page {currentPage} of {totalPages} • {songs.length} songs
                </small>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={onPageChange}
                />
              </div>
            </Card.Footer>
          )}

          {songs.length === 0 && (
            <div className="text-center py-5 text-muted">
              <h5>No songs found</h5>
              <p>Adjust your search parameters</p>
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Table;
