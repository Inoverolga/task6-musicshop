import express from "express"; //импортируем для создания сервера
// Импортируем CORS для разрешения междоменных запросов (чтобы React мог общаться с сервером)
import cors from "cors";
// Импортируем роуты для песен из файла songs.js
import routerSong from "./routes/routerSongs.js";

// Создаем экземпляр Express приложения
const app = express();

// Middleware: разрешаем запросы с других доменов (от React приложения)
app.use(
  cors({
    origin: [
      "https://music-shop-frontend.up.railway.app",
      "http://localhost:3000",
    ],
    credentials: true,
  })
);
// Middleware: парсим JSON данные из запросов
app.use(express.json());

// Подключаем маршруты для песен по пути /api/songs
// Все запросы к /api/songs будут обрабатываться в songRoutes
app.use("/api/songs", routerSong); // сами придумываем пути

// Обработчик для главной страницы сервера (http://localhost:3001/)????
app.get("/", (req, res) => {
  res.json({
    message: "Music Shop API",
    endpoints: {
      songs: "/api/songs?seed=123&page=1&language=en&limit=10",
    },
  });
});

// Устанавливаем порт для сервера (3001) или берем из переменных окружения
const PORT = process.env.PORT || 3001;
// Запускаем сервер на указанном порту
app.listen(PORT, () => {
  // Выводим сообщение при успешном запуске
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
