export const getRandomNumber = (min, max) => (
  Math.floor(min + Math.random() * (max - min + 1))
);

export const getRandomElementInArray = (array) => (
  array[getRandomNumber(0, array.length - 1)]
);

export const getRandomArrayElements = (array, limit) => (
  array.sort(() => Math.random() - 0.5).slice(0, getRandomNumber(1, limit))
);
