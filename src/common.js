export const getRandomNumber = (min, max) => (
  Math.floor(min + Math.random() * (max - min + 1))
);

export const getRandomElementInArray = (array) => (
  array[getRandomNumber(0, array.length - 1)]
);

export const createNewElement = (elem) => {
  const newElem = document.createElement(`div`);
  newElem.innerHTML = elem;
  return newElem.firstChild;
};
