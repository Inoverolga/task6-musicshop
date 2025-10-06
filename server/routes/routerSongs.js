import express from "express"; //импортирует для создания роутера
import { generateSongsPack } from "../generators/songGenerator.js";

const routerSong = express.Router();

// Обработчик GET запроса к /api/songs
// Пример: GET /api/songs?seed=123456&page=1&language=en&limit=10
routerSong.get("/", (req, res) => {
  try {
    // Извлекаем параметры из query string запроса
    // Query string - это часть URL после знака ? с параметрами.
    // Если параметры не указаны, используем значения по умолчанию
    const {
      seed = 123456, // Базовый seed для генерации (по умолчанию 123456)
      page = 1, // Номер страницы (по умолчанию 1)
      language = "en", // Язык данных (по умолчанию английский)
      limit = 10, // Количество песен на странице (по умолчанию 10)
      averageQuantityLikes, // среднее количество лайков
    } = req.query; //дистректуризация URL-строки (получаем)
    console.log(`данные которые пришли на бэк`, req.query);
    // Генерируем пачку песен с полученными параметрами
    // +seed - преобразуем строку в число с помощью унарного плюса

    let likesValue;
    if (averageQuantityLikes === undefined || averageQuantityLikes === "") {
      likesValue = 5; // значение по умолчанию только когда параметр не передан
    } else {
      likesValue = parseFloat(averageQuantityLikes);
    }

    const pack = generateSongsPack({
      seed: +seed, // Преобразуем в число
      page: +page, // Преобразуем в число
      language, // Язык передаем как есть (строка)
      limit: +limit, // Преобразуем в число
      averageQuantityLikes: likesValue, // Передать в генератор
    });

    // Отправляем сгенерированные песни в формате JSON
    res.json(pack);
  } catch (error) {
    // Если произошла ошибка, логируем ее и отправляем сообщение об ошибке
    console.error("Error generating songs:", error);
    res.status(500).json({ error: "Failed to generate songs" });
  }
});

export default routerSong;
