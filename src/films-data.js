// import {
//   getRandomNumber,
//   getRandomElementInArray,
//   getRandomElememtsInArray
// } from './common';
//
// import moment from 'moment';
//
// const DESCRIPTIONS = [
//   `A family saga with a supernatural twist, set in a German town, where the disappearance of two young children exposes the relationships among four families.`,
//   `The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.`,
//   `A criminal pleads insanity after getting into trouble again and once in the mental institution rebels against the oppressive nurse and rallies up the scared patients.`,
//   `A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival..`,
//   `Marty McFly, a 17-year-old high school student, is accidentally sent thirty years into the past in a time-traveling DeLorean invented by his close friend, the maverick scientist Doc Brown.`,
//   `In the future, a sadistic gang leader is imprisoned and volunteers for a conduct-aversion experiment, but it doesn't go as planned.`,
//   `Atticus Finch, a lawyer in the Depression-era South, defends a black man against an undeserved rape charge, and his children against prejudice..`,
// ];
//
// const POSTERS = [
//   `accused`,
//   `blackmail`,
//   `blue-blazes`,
//   `fuga-da-new-york`,
//   `moonrise`,
//   `three-friends`
// ];
//
// const GENRES = [
//   `Comedy`,
//   `Drama`,
//   `Science fiction`,
//   `Horror`,
//   `Thriller`,
//   `Romance comedy`,
//   `Science fiction`
// ];
//
// const TITLES = [
//   `Accused`,
//   `Blackmail`,
//   `Blue blazes`,
//   `Fuga da new york`,
//   `Moonrise`,
//   `Three friends`
// ];
//
// const DIRECTORS = [
//   `Christopher Nolan`,
//   `Wes Anderson`,
//   `Robert Zemeckis`,
//   `Tim Burton`,
//   `Steven Spielberg`,
//   `Ridley Scott`
// ];
//
// const WRITERS = [
//   `Nora Ephron`,
//   `Aaron Sorkin`,
//   `Charlie Kaufman`,
//   `Francis Ford Coppola`,
//   `Baran bo Odar`,
//   `Amy Sherman-Palladino`
// ];
//
// const ACTORS = [
//   `Leonardo DiCaprio`,
//   `Emilia Clarke`,
//   `Margot Robbie`,
//   `Viggo Mortensen`,
//   `Keanu Reeves`,
//   `Chloë Grace Moretz`
// ];
//
// const COUNTRIES = [
//   `USA`,
//   `Russia`,
//   `Canada`,
//   `Germany`,
//   `Portugal`
// ];
//
// const AGE_RATINGS = [
//   0,
//   6,
//   12,
//   16,
//   18
// ];
//
// const COMMENTS_MIN = 0;
// const COMMENTS_MAX = 100;
//
// const getRandomRating = () => (
//   `${getRandomNumber(0, 9)}.${getRandomNumber(0, 9)}`
// );
//
// const COMMENTS = [
//   {
//     author: `Elena Ilina`,
//     time: `20180618`,
//     comment: `WOW!`,
//     emoji: `😴`,
//   },
//   {
//     author: `Artem Alekhin`,
//     time: `20190518`,
//     comment: `Good!`,
//     emoji: `😀`,
//   },
//   {
//     author: `Anna Skopova`,
//     time: `20170511`,
//     comment: `So so`,
//     emoji: `😴`,
//   },
//   {
//     author: `Zhenya As`,
//     time: `20170812`,
//     comment: `Excellent`,
//     emoji: `😀`,
//   },
// ];
//
// const getRandomReleaseDate = () => moment(Math.floor(Math.random() * new Date().getTime())).format(`DD MMMM YYYY`);
//
// export const getRandomFilm = (id) => ({
//   title: getRandomElementInArray(TITLES),
//   poster: `../images/posters/${getRandomElementInArray(POSTERS)}.jpg`,
//   rating: getRandomRating(),
//   description: getRandomElementInArray(DESCRIPTIONS),
//   genre: getRandomElementInArray(GENRES),
//   duration: getRandomNumber(10, 350),
//   year: getRandomReleaseDate(),
//   commentsCount: getRandomNumber(COMMENTS_MIN, COMMENTS_MAX),
//   director: getRandomElementInArray(DIRECTORS),
//   ageRating: getRandomElementInArray(AGE_RATINGS),
//   actors: getRandomElememtsInArray(ACTORS, ACTORS.length).join(`, `),
//   writers: getRandomElememtsInArray(WRITERS, WRITERS.length).join(`, `),
//   countries: getRandomElementInArray(COUNTRIES),
//   comments: [getRandomElementInArray(COMMENTS)],
//   isWatched: Math.random() >= 0.5,
//   isInWatchlist: Math.random() >= 0.5,
//   isFavorite: Math.random() >= 0.5,
//   id
// });
//
// export const getArrayFilms = (count) => {
//   let arr = [];
//   for (let i = 0; i < count; ++i) {
//     arr.push(getRandomFilm(i));
//   }
//   return arr;
// };

class FilmStorage {
  constructor() {
    this._storage = null;
  }

  get dataStorage() {
    return this._storage;
  }
  set dataStorage(data) {
    this._storage = data;
  }
}
export default new FilmStorage();
