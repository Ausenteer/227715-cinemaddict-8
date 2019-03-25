import {makeFilters} from './make-filters';

import {getArrayFilters} from './filters-data';
import {getArrayFilms} from './films-data';

import {getRandomNumber} from './common';

import Film from './classes/film';
import Popup from './classes/popup';

const FILM_COUNT_INITIAL = 4;
const FILM_COUNT_RATED_COMMENTED = 2;

// селекторы
const mainNavigationSelector = document.querySelector(`.main-navigation`);
const filmsArraySelector = document.querySelector(`.films-list .films-list__container`);
const filmRatedSelector = document.querySelector(`.films-list--extra:nth-child(2) .films-list__container`);
const filmCommentedSelector = document.querySelector(`.films-list--extra:nth-child(3) .films-list__container`);

// добавить сгенерированные фильтры в .main-navigation
mainNavigationSelector.insertAdjacentHTML(`beforeEnd`, makeFilters(getArrayFilters()));

const filtersArraySelector = document.querySelectorAll(`.main-navigation__item:not(.main-navigation__item--additional)`);

// функция для отрисовки фильмов и попапа с помощью классов
const renderFilms = (selector, arr, isControl) => {
  arr.forEach((el) => {
    const film = new Film(el, isControl);
    const popup = new Popup(el);
    film.render(selector);

    film.onPopup = () => {
      popup.render(document.body);
    };
    popup.onSubmit = (newObject) => {
      selector.removeChild(film.element);
      film.update(newObject);
      film.render(selector);
      document.body.removeChild(popup.element);
      popup.unrender();
    };

    popup.onClose = (newObject) => {
      selector.removeChild(film.element);
      film.update(newObject);
      film.render(selector);
      document.body.removeChild(popup.element);
      popup.unrender();
    };
  });
};

// обработчики по клику на название фильтра
filtersArraySelector.forEach((element) => {
  element.addEventListener(`click`, () => {
    const newArrFilms = getArrayFilms(getRandomNumber(1, FILM_COUNT_INITIAL), true);
    filmsArraySelector.innerHTML = ``;
    renderFilms(filmsArraySelector, newArrFilms, true);
  });
});

// массивы из рандомных фильмов
const arrFillms = getArrayFilms(FILM_COUNT_INITIAL, true);
const arrFilmsRated = getArrayFilms(FILM_COUNT_RATED_COMMENTED, false);
const arrFilmsCommented = getArrayFilms(FILM_COUNT_RATED_COMMENTED, false);

// рендер фильмов
renderFilms(filmsArraySelector, arrFillms, true);
renderFilms(filmRatedSelector, arrFilmsRated, false);
renderFilms(filmCommentedSelector, arrFilmsCommented, false);

