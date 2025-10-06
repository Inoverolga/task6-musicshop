import express from "express";
import cors from "cors";
import routerSong from "./routes/routerSongs.js";

const app = express();

// SUPER SIMPLE CORS - РАБОТАЕТ 100%
app.use(cors());
app.use(express.json());

// Health check - ТОЛЬКО ОДИН РАЗ!
app.get("/health", (req, res) => {
  console.log("✅ Health check called");
  res.status(200).json({
    status: "OK",
    message: "Music Shop API is running!",
    timestamp: new Date().toISOString(),
  });
});

// Test endpoint - ДОБАВЬТЕ ЭТОТ
app.get("/test", (req, res) => {
  console.log("✅ Test endpoint called");
  res.json({
    message: "Test endpoint works!",
    timestamp: new Date().toISOString(),
  });
});

// Корневой endpoint
app.get("/", (req, res) => {
  console.log("✅ Root endpoint called");
  res.json({
    message: "🎵 Music Shop API",
    endpoints: {
      health: "/health",
      test: "/test",
      songs: "/api/songs?seed=123&page=1&language=en&limit=3",
    },
    timestamp: new Date().toISOString(),
  });
});

// Подключаем маршруты для песен
app.use("/api/songs", routerSong);

// 404 handler - ТОЛЬКО ОДИН РАЗ В КОНЦЕ!
app.use("*", (req, res) => {
  console.log("❌ 404 - Not found:", req.originalUrl);
  res.status(404).json({
    error: "Endpoint not found",
    requestedUrl: req.originalUrl,
    availableEndpoints: ["/", "/health", "/test", "/api/songs"],
    timestamp: new Date().toISOString(),
  });
});

// Устанавливаем порт для Render.com
const PORT = process.env.PORT || 10000;

// Запускаем сервер
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Health: http://localhost:${PORT}/health`);
  console.log(`📍 Test: http://localhost:${PORT}/test`);
});
