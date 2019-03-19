import {
  getRandomNumber,
  getRandomElementInArray
} from './common';

const DESCRIPTIONS = [
  `A family saga with a supernatural twist, set in a German town, where the disappearance of two young children exposes the relationships among four families.`,
  `The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.`,
  `A criminal pleads insanity after getting into trouble again and once in the mental institution rebels against the oppressive nurse and rallies up the scared patients.`,
  `A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival..`,
  `Marty McFly, a 17-year-old high school student, is accidentally sent thirty years into the past in a time-traveling DeLorean invented by his close friend, the maverick scientist Doc Brown.`,
  `In the future, a sadistic gang leader is imprisoned and volunteers for a conduct-aversion experiment, but it doesn't go as planned.`,
  `Atticus Finch, a lawyer in the Depression-era South, defends a black man against an undeserved rape charge, and his children against prejudice..`,
];

const POSTERS = [
  `accused`,
  `blackmail`,
  `blue-blazes`,
  `fuga-da-new-york`,
  `moonrise`,
  `three-friends`
];

const GENRES = [
  `Comedy`,
  `Drama`,
  `Science fiction`,
  `Horror`,
  `Thriller`,
  `Romance comedy`,
  `Science fiction`
];

const TITLES = [
  `Accused`,
  `Blackmail`,
  `Blue blazes`,
  `Fuga da new york`,
  `Moonrise`,
  `Three friends`
];

const YEAR_MIN = 1940;
const YEAR_MAX = 2019;

const COMMENTS_MIN = 0;
const COMMENTS_MAX = 100;

const getRandomRating = () => (
  `${getRandomNumber(0, 9)}.${getRandomNumber(0, 9)}`
);

const getRandomDuration = () => (
  `${getRandomNumber(0, 3)}h ${getRandomNumber(0, 59)}m`
);

export const getRandomFilm = () => ({
  title: getRandomElementInArray(TITLES),
  poster: `../images/posters/${getRandomElementInArray(POSTERS)}.jpg`,
  rating: getRandomRating(),
  description: getRandomElementInArray(DESCRIPTIONS),
  genre: getRandomElementInArray(GENRES),
  duration: getRandomDuration(),
  year: getRandomNumber(YEAR_MIN, YEAR_MAX),
  commentsCount: getRandomNumber(COMMENTS_MIN, COMMENTS_MAX)
});

export const getArrayFilms = (count) => [...Array(count).keys()].map(getRandomFilm);
