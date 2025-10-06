// Импортируем библиотеку axios для выполнения HTTP-запросов
// Axios упрощает работу с API по сравнению с нативным fetch
import axios from "axios";

// Базовый URL нашего API сервера
// В разработке используем localhost, при деплое заменим на production URL
const API_BASE = process.env.REACT_APP_API_URL
  ? `${process.env.REACT_APP_API_URL}/api`
  : "http://localhost:3001/api";

// Функция для получения списка песен с сервера
// params - объект с параметрами запроса: seed, page, language, limit
export const fetchSongs = async (params) => {
  try {
    // Выполняем GET-запрос к endpoint /api/songs
    // axios.get(url, config) - config содержит параметры запроса
    // { params } - автоматически преобразует объект в query string
    // Например: {seed: 123, page: 1} → ?seed=123&page=1
    const response = await axios.get(`${API_BASE}/songs`, { params });

    // Возвращаем только данные из response (response.data) количество песен на одной странице
    // axios автоматически парсит JSON ответ от сервера
    return response.data;
    //     [
    //   { id: 1, song: "Electric Dreams", artist: "John Doe", ... },
    //   { id: 2, song: "Summer Rain", artist: "Jane Smith", ... },
    //    ...
    // ]
  } catch (error) {
    // Обрабатываем ошибки запроса
    // error может быть: сетевые ошибки, 4xx/5xx статусы, таймауты
    console.error("Error fetching songs:", error);

    // Пробрасываем ошибку дальше, чтобы компонент мог её обработать
    // Компонент сможет показать сообщение об ошибке пользователю
    throw error;
  }
};
