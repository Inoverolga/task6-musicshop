export const generateLyrics = (songId) => {
  const lyricsPool = [
    "In the silence of the night I wait for you",
    "Every heartbeat echoes through the empty room",
    "Memories dance like shadows on the wall",
    "Your voice still echoes, answering my call",
    "Through the darkness I can see your light",
    "Guiding me through this endless night",
    "Whispers of love carried on the breeze",
    "Rustling through the midnight trees",
  ];

  const selectedLyrics = [];
  for (let i = 0; i < 6; i++) {
    const index = (songId + i * 7) % lyricsPool.length;
    selectedLyrics.push(lyricsPool[index]);
  }

  return selectedLyrics.map((text, index) => ({
    text,
    time: index * 3,
    duration: 2.5,
  }));
};
