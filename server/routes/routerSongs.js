import express from "express";
import { generateSongsPack } from "../generators/songGenerator.js";

const routerSong = express.Router();
routerSong.get("/", (req, res) => {
  try {
    const {
      seed = 123456,
      page = 1,
      language = "en",
      limit = 10,
      averageQuantityLikes,
    } = req.query;

    let likesValue;
    if (averageQuantityLikes === undefined || averageQuantityLikes === "") {
      likesValue = 5;
    } else {
      likesValue = parseFloat(averageQuantityLikes);
    }

    const pack = generateSongsPack({
      seed: +seed,
      page: +page,
      language,
      limit: +limit,
      averageQuantityLikes: likesValue,
    });
    res.json(pack);
  } catch (error) {
    console.error("Error generating songs:", error);
    res.status(500).json({ error: "Failed to generate songs" });
  }
});

export default routerSong;
