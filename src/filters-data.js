import {getRandomNumber} from './random-func';

const nameFilters = [`Watchlist`, `History`, `Favorites`];

export const getArrayFilters = () => [
  {
    name: `All movies`,
    state: `active`,
  },
  ...nameFilters.map((name) => ({
    name,
    count: getRandomNumber(0, 8)
  })),
  {
    name: `stats`,
    state: `additional`
  }
];
