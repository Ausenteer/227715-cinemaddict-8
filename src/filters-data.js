export const getArrayFilters = (watchListCount, historyCount, favoriteCount) => [
  {
    name: `All movies`,
    state: `active`,
  },
  {
    name: `Watchlist`,
    state: ``,
    count: watchListCount
  },
  {
    name: `History`,
    state: ``,
    count: historyCount
  },
  {
    name: `Favorite`,
    state: ``,
    count: favoriteCount
  },
  {
    name: `stats`,
    state: `additional`
  }
];

