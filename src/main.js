import {makeFilters} from './make-filters';
import {makeFilms} from './make-films';

import {getArrayFilters} from './filters-data';
import {getArrayFilms} from './films-data';

import {getRandomNumber} from './random-func';

const FILM_COUNT_INITIAL = 8;
const FILM_COUNT_RATED_COMMENTED = 2;

// селекторы
const mainNavigationSelector = document.querySelector(`.main-navigation`);
const filmsArraySelector = document.querySelector(`.films-list .films-list__container`);
const filmRatedSelector = document.querySelector(`.films-list--extra:nth-child(2) .films-list__container`);
const filmCommentedSelector = document.querySelector(`.films-list--extra:nth-child(3) .films-list__container`);

// добавить сгенерированные фильтры в .main-navigation
mainNavigationSelector.insertAdjacentHTML(`beforeEnd`, makeFilters(getArrayFilters()));

// добавить сгенерированные карточки фильмов в нужные селекторы
filmsArraySelector.insertAdjacentHTML(`beforeEnd`, makeFilms(getArrayFilms(FILM_COUNT_INITIAL), true));
filmRatedSelector.insertAdjacentHTML(`beforeEnd`, makeFilms(getArrayFilms(FILM_COUNT_RATED_COMMENTED), false));
filmCommentedSelector.insertAdjacentHTML(`beforeEnd`, makeFilms(getArrayFilms(FILM_COUNT_RATED_COMMENTED), false));

const filtersArraySelector = document.querySelectorAll(`.main-navigation__item:not(.main-navigation__item--additional)`);

// обработчики по клику на название фильтра
filtersArraySelector.forEach((element) => {
  element.addEventListener(`click`, () => {
    filmsArraySelector.innerHTML = ``;
    filmsArraySelector.insertAdjacentHTML(`beforeEnd`, makeFilms(getArrayFilms(getRandomNumber(1, FILM_COUNT_INITIAL)), true));
  });
});
