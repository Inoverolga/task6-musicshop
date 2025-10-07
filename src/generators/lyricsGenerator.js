import { fakerEN, fakerDE, fakerES } from "@faker-js/faker";

export const generateLyrics = (songId, language = "en") => {
  const faker =
    {
      en: fakerEN,
      de: fakerDE,
      es: fakerES,
    }[language] || fakerEN;

  faker.seed(songId);

  const lineCount = 4 + (songId % 4);

  const selectedLyrics = [];
  for (let i = 0; i < lineCount; i++) {
    const wordCount = 3 + ((songId + i) % 6);
    const line = faker.lorem.words({ min: wordCount, max: wordCount });
    selectedLyrics.push(line);
  }

  const totalDuration = 8.0;
  const lineDuration = totalDuration / lineCount;

  return selectedLyrics.map((text, index) => ({
    text,
    time: index * lineDuration * 0.8,
    duration: lineDuration * 1.2,
  }));
};
