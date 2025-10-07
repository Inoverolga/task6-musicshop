import { fakerEN, fakerDE, fakerES } from "@faker-js/faker";

export const getFakerForLanguage = (language) => {
  const local = {
    de: fakerDE,
    es: fakerES,
    en: fakerEN,
  };
  return local[language] || local.en;
};

export const generateSongData = (seed, index, page, limit, language) => {
  const localizedFaker = getFakerForLanguage(language);
  localizedFaker.seed(seed);

  const minutes = localizedFaker.number.int({ min: 2, max: 5 });
  const seconds = localizedFaker.number.int({ min: 0, max: 59 });

  const isSingle = localizedFaker.datatype.boolean(0.7);

  return {
    id: (page - 1) * limit + index + 1,
    title: localizedFaker.music.songName(),
    artist: localizedFaker.person.fullName(),
    album: isSingle ? "Single" : localizedFaker.music.album(),
    genre: localizedFaker.music.genre(),
    duration: `${minutes}:${seconds.toString().padStart(2, "0")}`,
  };
};

export const generateLikes = (songId, averageQuantityLikes) => {
  const baseLikes = Math.floor(averageQuantityLikes);
  const fractionalPart = averageQuantityLikes - baseLikes;
  const shouldAddLike =
    ((songId * 12345 + 67890) % 10000) / 10000 < fractionalPart;
  const additionalLike = shouldAddLike ? 1 : 0;
  return baseLikes + additionalLike;
};

export const generateSongsPack = ({
  seed,
  page,
  language,
  limit = 10,
  averageQuantityLikes = 5,
}) => {
  const pack = [];

  for (let i = 0; i < limit; i++) {
    const itemSeed = +seed + +page * 1000 + i;
    const coreData = generateSongData(itemSeed, i, page, limit, language);
    const likes = generateLikes(coreData.id, averageQuantityLikes);
    const fullSongData = {
      ...coreData,
      likes: likes,
    };
    pack.push(fullSongData);
  }
  return pack;
};
