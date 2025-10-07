import express from "express";
import cors from "cors";
import routerSong from "./routes/routerSongs.js";
import routerExport from "./routes/routerExport.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/songs", routerSong);
app.use("/api/export", routerExport);

app.get("/", (req, res) => {
  console.log("✅ Root endpoint called");
  res.json({
    message: "🎵 Music Shop API",
    endpoints: {
      health: "/health",
      test: "/test",
      songs: "/api/songs?seed=123&page=1&language=en&limit=3",
      export: "/api/export?seed=123&page=1&language=en&limit=10",
    },
    timestamp: new Date().toISOString(),
  });
});

app.get("/health", (req, res) => {
  console.log("✅ Health check called");
  res.status(200).json({
    status: "OK",
    message: "Music Shop API is running!",
    timestamp: new Date().toISOString(),
  });
});

app.get("/test", (req, res) => {
  console.log(" Test endpoint called");
  res.json({
    message: "Test endpoint works!",
    timestamp: new Date().toISOString(),
  });
});

app.use("*", (req, res) => {
  console.log("❌ 404 - Not found:", req.originalUrl);
  res.status(404).json({
    error: "Endpoint not found",
    requestedUrl: req.originalUrl,
    availableEndpoints: ["/", "/health", "/test", "/api/songs"],
    timestamp: new Date().toISOString(),
  });
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
