import { Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import ExportButton from "../exportButton/ExportButton";

const Toolbar = ({ params, setParams, viewStyle, onViewModeChange }) => {
  const handleSeedChange = (e) => {
    setParams((prev) => ({ ...prev, seed: e.target.value }));
  };

  const handleRandomSeed = () => {
    setParams((prev) => ({ ...prev, seed: Date.now() }));
  };

  const handleLanguageChange = (e) => {
    setParams((prev) => ({ ...prev, language: e.target.value }));
  };

  const handleLikesChange = (e) => {
    const value = e.target.value;

    if (value === "" || /^-?\d*\.?\d*$/.test(value)) {
      setParams((prev) => ({ ...prev, averageQuantityLikes: value }));
    }
  };

  return (
    <div className="toolbar-custom bg-white rounded-3 shadow-lg p-4 mb-4">
      <Row className="g-3 align-items-end">
        <Col md={3}>
          <Form.Group>
            <Form.Label className="fw-bold text-primary small">
              🎲 Random Seed
            </Form.Label>
            <InputGroup>
              <Form.Control
                type="number"
                value={params.seed}
                onChange={handleSeedChange}
                className="border-primary"
              />
              <Button variant="outline-primary" onClick={handleRandomSeed}>
                Generate
              </Button>
            </InputGroup>
          </Form.Group>
        </Col>

        <Col md={2}>
          <Form.Group>
            <Form.Label className="fw-bold text-danger small">
              ❤️ Likes/Song
            </Form.Label>
            <Form.Control
              type="text"
              value={params.averageQuantityLikes}
              onChange={handleLikesChange}
              className="border-danger"
            />
          </Form.Group>
        </Col>

        <Col md={2}>
          <Form.Group>
            <Form.Label className="fw-bold text-success small">
              🌐 Language
            </Form.Label>
            <Form.Select
              value={params.language}
              onChange={handleLanguageChange}
              className="border-success"
            >
              <option value="en">English</option>
              <option value="de">German</option>
              <option value="es">Spanish</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={2}>
          <Form.Group>
            <Form.Label className="fw-bold text-warning small">
              👁️ View Mode
            </Form.Label>
            <Form.Select
              value={viewStyle}
              onChange={(e) => onViewModeChange(e.target.value)}
              className="border-warning"
            >
              <option value="table">📊 Table</option>
              <option value="gallery">🎨 Gallery</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={2}>
          <Form.Group>
            <Form.Label className="fw-bold text-info small">
              💾 Export
            </Form.Label>
            <ExportButton params={params} />
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
};

export default Toolbar;
