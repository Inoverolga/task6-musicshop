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
      "https://task6-musicshop-front.onrender.com",
      "http://localhost:3000",
      "http://localhost:3001",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
    preflightContinue: false,
    optionsSuccessStatus: 204,
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

// Добавьте перед app.listen
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

app.get("/test", (req, res) => {
  res.json({ message: "Test endpoint works!" });
});

app.use((req, res) => {
  res.status(404).json({
    error: "Endpoint not found",
    requestedUrl: req.url,
    availableEndpoints: ["GET /", "GET /health", "GET /test", "GET /api/songs"],
  });
});

// Запускаем сервер на указанном порту
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
