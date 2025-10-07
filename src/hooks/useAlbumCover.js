import { useMemo } from "react";

const useAlbumCover = () => {
  const albumStyles = useMemo(
    () => [
      "pop",
      "rock",
      "electronic",
      "hiphop",
      "jazz",
      "retro",
      "neon",
      "acoustic",
      "funk",
      "classical",
    ],
    []
  );

  const getAlbumCoverUrl = (song, size = 400) => {
    if (!song || !song.id) return "";

    const styleIndex =
      Math.abs(
        song.id
          .toString()
          .split("")
          .reduce((a, b) => {
            return a + b.charCodeAt(0);
          }, 0)
      ) % albumStyles.length;

    const style = albumStyles[styleIndex];
    const API_URL = process.env.REACT_APP_API_URL;

    return `${API_URL}/api/album/${style}?size=${size}`;
  };

  const getAlbumCoverByGenre = (genre, size = 400) => {
    const normalizedGenre = genre?.toLowerCase() || "pop";

    const genreMap = {
      pop: "pop",
      rock: "rock",
      electronic: "electronic",
      "hip hop": "hiphop",
      rap: "hiphop",
      jazz: "jazz",
      classical: "classical",
      acoustic: "acoustic",
      funk: "funk",
      retro: "retro",
      indie: "neon",
    };

    const style = genreMap[normalizedGenre] || "pop";
    const API_URL = process.env.REACT_APP_API_URL;

    return `${API_URL}/api/album/${style}?size=${size}`;
  };

  return {
    getAlbumCoverUrl,
    getAlbumCoverByGenre,
    albumStyles,
  };
};

export default useAlbumCover;
