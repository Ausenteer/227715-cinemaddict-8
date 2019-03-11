import makeFilter from './make-filter';
import makeCard from './make-card';

const filtersSelector = document.querySelector(`.main-navigation`);
const filmsSelectorArray = document.querySelectorAll(`.films-list__container`);

const filters = [
  {
    link: `#all`,
    className: `main-navigation__item main-navigation__item--active`,
    title: `All movies`
  },
  {
    link: `#watchlist`,
    className: `main-navigation__item`,
    title: `Watchlist`,
    count: 13
  },
  {
    link: `#history`,
    className: `main-navigation__item`,
    title: `History`,
    count: 4
  },
  {
    link: `#favorites`,
    className: `main-navigation__item`,
    title: `Favorites`,
    count: 8
  },
  {
    link: `#stats`,
    className: `main-navigation__item main-navigation__item--additional`,
    title: `Stats`
  }
];

const cards = [
  {
    title: `The Assassination Of Jessie James By The Coward Robert Ford`,
    rating: `9.8`,
    year: `2018`,
    duration: `1h 13m`,
    genre: `comedy`,
    poster: `three-friends`,
    description: `A priest with a haunted past and a novice on the threshold of her final
    vows are sent by the Vatican to investigate the death of a young nun in Romania and confront a malevolent
    force in the form of a demonic nun.`,
    comments: `13`
  },
  {
    title: `Accused`,
    rating: `5.6`,
    year: `2014`,
    duration: `1h 45m`,
    genre: `drama`,
    poster: `accused`,
    description: `A priest with a haunted past and a novice on the threshold of her final
    vows are sent by the Vatican.`,
    comments: `89`
  },
  {
    title: `Blackmail`,
    rating: `7.8`,
    year: `1999`,
    duration: `1h 27m`,
    genre: `action`,
    poster: `blackmail`,
    description: `and a novice on the threshold of her final
    vows are sent by the Vatican to investigate the death of a young nun in Romania and confront a malevolent
    force in the form of a demonic nun.`,
    comments: `10`
  },
  {
    title: `da-new-york`,
    rating: `7.0`,
    year: `2000`,
    duration: `1h 19m`,
    genre: `drama`,
    poster: `fuga-da-new-york`,
    description: `Vatican to investigate the death of a young nun in Romania and confront a malevolent
    force in the form of a demonic nun.`,
    comments: `190`
  },
  {
    title: `Moonrise`,
    rating: `7.0`,
    year: `1920`,
    duration: `0h 59m`,
    genre: `comedy`,
    poster: `moonrise`,
    description: ` demonic nun.`,
    comments: `1`
  }
];

const renderFilters = (arr) => {
  arr.forEach((item) => {
    filtersSelector.insertAdjacentHTML(`beforeend`, makeFilter(item.link, item.className, item.title, item.count));
  });
};

const renderCards = (arr) => {
  arr.forEach((item) => {
    filmsSelectorArray[0].insertAdjacentHTML(`beforeend`, makeCard(item.title, item.rating, item.year, item.duration, item.genre, item.poster, item.description, item.comments));
  });
};

const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];
const randomNum = (max, min) => Math.floor(Math.random() * (max - min)) + min;

const getNewArrCards = (min, max, arr) => {
  const rand = randomNum(min, max);
  const newArrCards = [];

  for (let i = 1; i < rand; ++i) {
    newArrCards.push(getRandomElement(arr));
  }
  return newArrCards;
};

const handleClickFilter = (element, i) => {
  element[i].addEventListener(`click`, () => {
    filmsSelectorArray[0].innerHTML = ``;
    renderCards(getNewArrCards(2, 7, cards), filmsSelectorArray[0]);
  });
};

const onClickFilter = () => {
  const filtersArrSelector = document.querySelectorAll(`.main-navigation__item`);

  Array.from(filtersArrSelector).forEach((element, i) => {
    handleClickFilter(filtersArrSelector, i);
  });
};

renderFilters(filters);
renderCards(cards);
onClickFilter();

const renderCardsTop = (arr) => {
  arr.forEach((item) => {
    filmsSelectorArray[1].insertAdjacentHTML(`beforeend`, makeCard(item.title, item.rating, item.year, item.duration, item.genre, item.poster, item.description, item.comments, true));
  });
};

const cardsTop = cards.slice(0, 2);
renderCardsTop(cardsTop, filmsSelectorArray[1]);

const renderCardsComment = (arr) => {
  arr.forEach((item) => {
    filmsSelectorArray[2]
      .insertAdjacentHTML(`beforeend`, makeCard(item.title, item.rating, item.year, item.duration, item.genre, item.poster, item.description, item.comments, true));
  });
};

const cardsComment = cards.slice(3, 6);
renderCardsComment(cardsComment, filmsSelectorArray[2]);
