import { fakerEN, fakerDE, fakerES } from "@faker-js/faker"; //Faker.js - это библиотека для генерации реалистичных фейковых данных.

// npm install @faker-js   Нужно установить локали на серверной части
// Faker умеет генерировать ЛЮБЫЕ данные:
// faker.person.fullName();     // → "John Doe"
// faker.music.songName();      // → "Electric Dreams"
// faker.music.genre();         // → "Rock"
// faker.location.city();       // → "New York"
// faker.internet.email();      // → "john.doe@email.com"
// faker.date.past();           // → 2023-05-15T10:30:00.000Z

export const getFakerForLanguage = (language) => {
  const local = {
    de: fakerDE, // Немецкий Faker
    es: fakerES, // Испанский Faker
    en: fakerEN, // Английский Faker
  };

  return local[language] || local.en;
};

//генерации ОСНОВНЫХ данных песни (без лайков)
export const generateSongData = (seed, index, page, limit, language) => {
  // Устанавливаем seed для детерминированной генерации
  // (Детерминированность - одинаковые входные данные = одинаковый результат)
  //пользователь вводит seed=123 → всегда видит одни и те же песни в том же порядке, на любом устройстве, в любой день!
  const localizedFaker = getFakerForLanguage(language); // Выбираем правильную локализацию Faker
  localizedFaker.seed(seed);

  // Детерминированная генерация длительности
  const minutes = localizedFaker.number.int({ min: 2, max: 5 });
  const seconds = localizedFaker.number.int({ min: 0, max: 59 });
  // Определяем, является ли трек синглом (30% chance быть альбомом)
  const isSingle = localizedFaker.datatype.boolean(0.7); // 70% вероятность true => chance может быть синглом

  console.log(`возвращаем с бэка объект с данными песни без лайков`, {
    id: (page - 1) * limit + index + 1,
    title: localizedFaker.music.songName(),
    artist: localizedFaker.person.fullName(),
    album: isSingle ? "Single" : localizedFaker.music.album(),
    genre: localizedFaker.music.genre(),
    duration: `${minutes}:${seconds.toString().padStart(2, "0")}`,
  });

  return {
    // Возвращаем объект с данными песни (одна конкретная позиция)
    id: (page - 1) * limit + index + 1, // Уникальный ID: (номер_страницы - 1) * количество_песен_на_странице + индекс_в_батче + 1
    title: localizedFaker.music.songName(), // Генерируем случайное название песни
    artist: localizedFaker.person.fullName(), // Генерируем случайное имя артиста
    album: isSingle ? "Single" : localizedFaker.music.album(), // Если сингл - "Single", иначе случайное название альбома
    genre: localizedFaker.music.genre(), // Генерируем случайный музыкальный жанр
    duration: `${minutes}:${seconds.toString().padStart(2, "0")}`, //Гарантирует формат "3:05" вместо "3:5"
  };
};

// Функция генерации только ЛАЙКОВ
export const generateLikes = (seed, averageQuantityLikes) => {
  const baseLikes = Math.floor(averageQuantityLikes); // Базовое количество лайков - целая часть от среднего значения
  // Например: averageQuantityLikes = 3.7 → baseLikes = 3
  const fractionalPart = averageQuantityLikes - baseLikes; // Дробная часть определяет вероятность получения дополнительного лайка
  // Например: averageQuantityLikes = 3.7 → fractionalPart = 0.7

  // Детерминированное решение на основе seed
  // Детерминированное решение на основе seed:
  // 1. seed % 1000 - берем остаток от деления seed на 1000 (число от 0 до 999)
  // 2. / 1000 - нормализуем к диапазону 0.000 - 0.999
  // 3. Сравниваем с fractionalPart - если меньше, то добавляем лайк
  const shouldAddLike = (seed % 1000) / 1000 < fractionalPart;
  const additionalLike = shouldAddLike ? 1 : 0;

  return baseLikes + additionalLike; // Итоговое количество лайков
};

// Функция генерации пачка песен (пачка+лайки)
export const generateSongsPack = ({
  seed,
  page,
  language,
  limit = 10,
  averageQuantityLikes = 5,
}) => {
  const pack = []; // Массив для хранения сгенерированных песен = 1пачке = 1 стр

  // Генерируем указанное количество песен (по умолчанию 10)
  for (let i = 0; i < limit; i++) {
    // Создаем уникальный seed для каждой песни: базовый_seed + номер_страницы * 1000 + индекс_песни
    // Это гарантирует, что разные страницы и разные песни будут иметь разный контент
    const itemSeed = +seed + +page * 1000 + i;

    // Всегда генерируем данные заново, но гарантируем детерминированность
    const coreData = generateSongData(itemSeed, i, page, limit, language);
    const likes = generateLikes(itemSeed + 100000, averageQuantityLikes);

    // Объединяем данные и лайки в один объект
    const fullSongData = {
      ...coreData, // разворачиваем все свойства из coreData
      likes: likes, // добавляем лайки
    };
    // Генерируем песню и добавляем в массив
    pack.push(fullSongData);
  }
  console.log(`Сгенерировано песен: ${pack}`);
  return pack; // Возвращаем массив сгенерированных песен
};
