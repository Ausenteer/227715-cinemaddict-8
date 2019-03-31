import {getArrayFilters} from './filters-data';
import {getArrayFilms} from './films-data';

import Film from './classes/film';
import Popup from './classes/popup';
import Filter from './classes/filter';
import Statistic from './classes/statistic';

const FILM_COUNT_INITIAL = 4;
const FILM_COUNT_RATED_COMMENTED = 2;

// селекторы
const mainNavigationSelector = document.querySelector(`.main-navigation`);
const filmsArraySelector = document.querySelector(`.films-list .films-list__container`);
const filmRatedSelector = document.querySelector(`.films-list--extra:nth-child(2) .films-list__container`);
const filmCommentedSelector = document.querySelector(`.films-list--extra:nth-child(3) .films-list__container`);

const filteredFilms = (films, nameFilter) => {
  switch (nameFilter) {
    case `All movies`:
      return films;
    case `Watchlist`:
      return films.filter((el) => el.isInWatchlist === true);
    case `History`:
      return films.filter((el) => el.isWatched === true);
    default:
      return films;
  }
};

const updateFilms = (films, newFilm) => {
  const index = films.findIndex((el) => el.id === newFilm.id);
  films.splice(index, 1, newFilm);
  return films;
};

// массивы из рандомных фильмов
const arrFillms = getArrayFilms(FILM_COUNT_INITIAL);
const arrFilmsRated = getArrayFilms(FILM_COUNT_RATED_COMMENTED);
const arrFilmsCommented = getArrayFilms(FILM_COUNT_RATED_COMMENTED);

// функция для отрисовки фильмов и попапа с помощью классов
const commonRender = () => {
  const renderFilms = (selector, arr, isControl) => {
    const statistic = new Statistic(arrFillms);
    statistic._bind();
    statistic.statisticRender = () => {
      filmsArraySelector.innerHTML = ``;
      statistic.render(filmsArraySelector);
      statistic.calcStatistic();
    };

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

      film.onMarkAsWatched = (newObject) => {
        newObject.isWatched = !newObject.isWatched;
        film.update(newObject);
        const newArr = updateFilms(arr, newObject);
        statistic.update(newArr);
      };

      film.onAddToWatchList = (newObject) => {
        newObject.isInWatchlist = !newObject.isInWatchlist;
        film.update(newObject);
        const newArr = updateFilms(arr, newObject);
        statistic.update(newArr);
      };
    });
  };
  const arrFilters = getArrayFilters();

  arrFilters.forEach((el) => {
    const filter = new Filter(el);
    filter.render(mainNavigationSelector);

    filter.onFilter = (evt) => {
      const filterName = evt.target.textContent.replace(/\d+/g, ``).trim();
      const filteredF = filteredFilms(arrFillms, filterName);
      filmsArraySelector.innerHTML = ``;
      renderFilms(filmsArraySelector, filteredF, true);
    };
  });

  renderFilms(filmsArraySelector, arrFillms, false);
  renderFilms(filmRatedSelector, arrFilmsRated, false);
  renderFilms(filmCommentedSelector, arrFilmsCommented, false);
};

commonRender();

