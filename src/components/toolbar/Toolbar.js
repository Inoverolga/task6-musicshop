import { Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import ExportButton from "../exportButton/ExportButton.js";
// Компонент Toolbar - панель управления для фильтрации и настройки данных
const Toolbar = ({ params, setParams, viewStyle, onViewModeChange }) => {
  // - params: текущие параметры (объект с seed, language, likesPerSong)
  // - setParams: функция для обновления параметров
  // Обработчик изменения seed (пользователь не нажимает на кнопку)
  const handleSeedChange = (e) => {
    // Обновляем параметры, сохраняя предыдущие значения (...prev)
    // и изменяя только поле seed
    setParams((prev) => ({ ...prev, seed: e.target.value }));
  }; // e.target.value содержит новое значение из input

  // Обработчик генерации случайного seed (пользователь нажимает на кнопку и генерирует новый seed)
  const handleRandomSeed = () => {
    // Устанавливаем seed как текущую временную метку
    // Date.now() возвращает количество миллисекунд с 1 января 1970 года
    setParams((prev) => ({ ...prev, seed: Date.now() }));
  };

  // Обработчик изменения языка
  const handleLanguageChange = (e) => {
    // Обновляем язык данных (en, de, es)
    setParams((prev) => ({ ...prev, language: e.target.value }));
  };

  // Обработчик изменения среднего количества лайков
  const handleLikesChange = (e) => {
    // e.target.value всегда строка, даже для type="number"
    // Например: "3.7" (строка)
    // Number преобразует строку в дробное число (например "3.7" → 3.7)
    // В среднем 3.7 лайка на песню:
    // - 70% песен имеют 4 лайка
    // - 30% песен имеют 3 лайка
    // Среднее: (4 * 0.7) + (3 * 0.3) = 3.7
    const value = e.target.value;
    // Разрешаем числа, точку и пустую строку
    // Разрешаем ввод чисел и точки
    if (value === "" || /^-?\d*\.?\d*$/.test(value)) {
      setParams((prev) => ({ ...prev, averageQuantityLikes: value }));
    }
  };

  // Возвращаем JSX разметку компонента
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
