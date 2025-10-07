import express from "express";
import JSZip from "jszip";
import { generateSongsPack } from "../generators/songGenerator.js";

const routerExport = express.Router();

routerExport.get("/", async (req, res) => {
  try {
    const { seed = 123456, page = 1, language = "en", limit = 10 } = req.query;
    const songs = generateSongsPack({ seed, page, language, limit });
    const zip = new JSZip();

    songs.forEach((song, index) => {
      const content = `
Song: ${song.title}
Artist: ${song.artist}
Album: ${song.album}
Genre: ${song.genre}
Duration: ${song.duration}
Likes: ${song.likes}

This is a placeholder for MP3 file.
In real implementation, generate actual audio here.
      `;

      const filename =
        `${song.title} - ${song.album} - ${song.artist}.txt`.replace(
          /[<>:"/\\|?*]/g,
          "_"
        );

      zip.file(filename, content);
    });

    const zipBuffer = await zip.generateAsync({ type: "nodebuffer" });

    res.set({
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="songs-export-${seed}.zip"`,
    });

    res.send(zipBuffer);
  } catch (error) {
    console.error("Export error:", error);
    res.status(500).json({ error: "Export failed" });
  }
});

export default routerExport;
