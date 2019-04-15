import {getArrayFilters} from './filters-data';
import dataFilm from './films-data';

import Film from './classes/film';
import Popup from './classes/popup';
import Filter from './classes/filter';
import Statistic from './classes/statistic';
import API from './classes/api';

let filmCountInitialFrom = 0;
let filmCountInitialTo = 5;
let filmsView;

// селекторы
const mainNavigationSelector = document.querySelector(`.main-navigation`);
const filmsArraySelector = document.querySelector(`.films-list .films-list__container`);
const filmRatedSelector = document.querySelector(`.films-list--extra:nth-child(2) .films-list__container`);
const filmCommentedSelector = document.querySelector(`.films-list--extra:nth-child(3) .films-list__container`);
const showMoreBtn = document.querySelector(`.films-list__show-more`);

const AUTHORIZATION = `Basic qw009eyr45456329ipt12`;
const END_POINT = `https://es8-demo-srv.appspot.com/moowle/`;
const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});

const filteredFilms = (films, nameFilter) => {
  switch (nameFilter) {
    case `All movies`:
      return films;
    case `Watchlist`:
      return films.filter((el) => el.watchlist === true);
    case `History`:
      return films.filter((el) => el.alreadyWatched === true);
    case `Favorite`:
      return films.filter((el) => el.favorite === true);
    default:
      return films;
  }
};


// функция для отрисовки фильмов и попапа с помощью классов
const commonRender = () => {
  const showMoreFilms = (films) => {
    let arrFilmsToRender = films.slice(filmCountInitialFrom, filmCountInitialTo);
    renderFilms(filmsArraySelector, arrFilmsToRender, true);
    if (filmCountInitialTo >= films.length) {
      showMoreBtn.removeEventListener(`click`, showMoreFilmsCallback);
      showMoreBtn.classList.add(`visually-hidden`);
    }
    filmCountInitialTo += 5;
    filmCountInitialFrom += 5;
  };

  const showMoreFilmsCallback = () => showMoreFilms(filmsView);

  api.getFilms()
    .then((films) => (dataFilm.data = films))
    .then(() => {
      showMoreBtn.addEventListener(`click`, showMoreFilmsCallback);
      filmsView = dataFilm.data;
      const arrFilmsRated = dataFilm.data.sort((a, b) => b.userComments.length - a.userComments.length).slice(0, 2);
      const arrFilmsCommented = dataFilm.data.sort((a, b) => b.rating - a.rating).slice(0, 2);
      showMoreFilms(filmsView);
      renderFilms(filmRatedSelector, arrFilmsRated, false);
      renderFilms(filmCommentedSelector, arrFilmsCommented, false);
      renderFilters(dataFilm.data);
      filmCountInitialTo = 5;
    });

  const renderFilters = (data) => {
    mainNavigationSelector.innerHTML = ``;
    const watchlistCount = Array.from(data).filter((el) => el.watchlist === true).length;
    const historyCount = Array.from(data).filter((el) => el.alreadyWatched === true).length;
    const favoriteCount = Array.from(data).filter((el) => el.favorite === true).length;
    const arrFilters = getArrayFilters(watchlistCount, historyCount, favoriteCount);
    for (let el of arrFilters) {
      const filter = new Filter(el);
      filter.render(mainNavigationSelector);
      filter.onFilter = () => {
        const filteredCards = filteredFilms(dataFilm.data, el.name);
        showMoreBtn.classList.remove(`visually-hidden`);
        filmsView = filteredCards;
        showMoreBtn.removeEventListener(`click`, showMoreFilmsCallback);
        showMoreBtn.addEventListener(`click`, showMoreFilmsCallback);
        filmCountInitialFrom = 0;
        filmCountInitialTo = 5;
        filmsArraySelector.innerHTML = ``;
        showMoreFilms(filmsView);
      };
    }
    const statistic = new Statistic(dataFilm.data);
    statistic._bind();
    statistic.statisticRender = () => {
      filmsArraySelector.innerHTML = ``;
      statistic.render(filmsArraySelector);
      statistic.calcStatistic();
    };
  };

  const renderFilms = (selector, arr, isControl) => {
    arr.forEach((el) => {
      const film = new Film(el, isControl);
      const popup = new Popup(el);
      film.render(selector);

      film.onPopup = () => {
        popup.render(document.body);
      };
      popup.onSubmit = (newObject) => {
        el.userComments = newObject.userComments;
        api.updateFilm({id: el.id, data: el.toRAW()})
          .then(() => {
            selector.removeChild(film.element);
            film.update(newObject);
            film.render(selector);
          });
      };

      popup.onClose = (newObject) => {
        el.rating = newObject.rating;
        api.updateFilm({id: el.id, data: el.toRAW()})
          .then(() => {
            selector.removeChild(film.element);
            film.update(newObject);
            film.render(selector);
            document.body.removeChild(popup.element);
            popup.unrender();
          });

      };

      film.onMarkAsWatched = () => {
        el.alreadyWatched = !el.alreadyWatched;
        api.updateFilm({id: el.id, data: el.toRAW()})
          .then((newData) => {
            film.update(newData);
            renderFilters(dataFilm.data);
          });
      };

      film.onAddToFavorite = () => {
        el.favorite = !el.favorite;
        api.updateFilm({id: el.id, data: el.toRAW()})
          .then((newData) => {
            film.update(newData);
            renderFilters(dataFilm.data);
          });
      };

      film.onAddToWatchList = () => {
        el.watchlist = !el.watchlist;
        api.updateFilm({id: el.id, data: el.toRAW()})
          .then((newData) => {
            film.update(newData);
            renderFilters(dataFilm.data);
          });
        // const newArr = updateFilms(arr, newObject);
        // statistic.update(newArr);
      };
    });
  };


  // const arrFilters = getArrayFilters();
  //
  // arrFilters.forEach((el) => {
  //   const filter = new Filter(el);
  //   filter.render(mainNavigationSelector);
  //
  //   filter.onFilter = (evt) => {
  //     const filterName = evt.target.textContent.replace(/\d+/g, ``).trim();
  //     const filteredF = filteredFilms(arrFilms, filterName);
  //     filmsArraySelector.innerHTML = ``;
  //     renderFilms(filmsArraySelector, filteredF, true);
  //   };
  // });

  // renderFilms(filmsArraySelector, arrFilms, true);
  // renderFilms(filmRatedSelector, arrFilmsRated, false);
  // renderFilms(filmCommentedSelector, arrFilmsCommented, false);
};

commonRender();

