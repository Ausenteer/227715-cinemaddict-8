import {makeFilm} from '../make-films';
import {Component} from "./component";

import cloneDeep from 'lodash.clonedeep';

export default class Film extends Component {
  constructor(data, isControl) {
    super(data, isControl);
    this._data = cloneDeep(data);
    this.isControl = isControl;

    this._onClick = this._onClick.bind(this);
    this._onAddToWatchListClick = this._onAddToWatchListClick.bind(this);
    this._onMarkAsWatchedClick = this._onMarkAsWatchedClick.bind(this);
    this._onAddToFavoriteClick = this._onAddToFavoriteClick.bind(this);

    this._onPopup = null;
    this._onAddToWatchList = null;
    this._onMarkAsWatched = null;
    this._onAddToFavorite = null;

  }
  get template() {
    return makeFilm(this._data, this.isControl);
  }

  set onPopup(fn) {
    this._onPopup = fn;
  }

  set onAddToWatchList(fn) {
    this._onAddToWatchList = fn;
  }

  set onMarkAsWatched(fn) {
    this._onMarkAsWatched = fn;
  }

  set onAddToFavorite(fn) {
    this._onAddToFavorite = fn;
  }

  _onClick() {
    return typeof this._onPopup === `function` && this._onPopup();
  }

  _onAddToWatchListClick(event) {
    event.preventDefault();
    return typeof this._onAddToWatchList === `function` && this._onAddToWatchList(this._data);
  }

  _onMarkAsWatchedClick(event) {
    event.preventDefault();
    return typeof this._onMarkAsWatched === `function` && this._onMarkAsWatched(this._data);
  }
  _onAddToFavoriteClick(event) {
    event.preventDefault();
    return typeof this._onAddToFavorite === `function` && this._onAddToFavorite(this._data);
  }

  _bind() {
    this._element.querySelector(`.film-card__comments`).addEventListener(`click`, this._onClick);
    if (!this._element.classList.contains(`film-card--no-controls`)) {
      this._element.querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, this._onAddToWatchListClick);
      this._element.querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, this._onMarkAsWatchedClick);
      this._element.querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, this._onAddToFavoriteClick);
    }
  }

  _unbind() {
    this._element.querySelector(`.film-card__comments`).removeEventListener(`click`, this._onClick);
    this._element.querySelector(`.film-card__controls-item--add-to-watchlist`).removeEventListener(`click`, this._onAddToWatchListClick);
    this._element.querySelector(`.film-card__controls-item--mark-as-watched`).removeEventListener(`click`, this._onMarkAsWatchedClick);
  }

  update(data) {
    if (data.rating) {
      this._data.rating = data.rating;
    }

    if (data.userComments) {
      this._data.userComments = data.userComments;
    }
  }
}
