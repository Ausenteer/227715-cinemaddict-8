import {makeFilm} from '../make-films';
import {Component} from "./component";

import cloneDeep from 'lodash.clonedeep';

export default class Film extends Component {
  constructor(data, isControl) {
    super(data, isControl);
    this._data = cloneDeep(data);

    this._onClick = this._onClick.bind(this);
    this._onPopup = null;
  }
  get template() {
    return makeFilm(this._data, this._isControl);
  }

  set onPopup(fn) {
    this._onPopup = fn;
  }
  _onClick() {
    return typeof this._onPopup === `function` && this._onPopup();
  }

  _bind() {
    this._element.querySelector(`.film-card__comments`).addEventListener(`click`, this._onClick);
  }

  _unbind() {
    this._element.querySelector(`.film-card__comments`).removeEventListener(`click`, this._onClick);
  }

  update(data) {
    if (data.rating) {
      this._data.rating = data.rating;
    }

    if (data.comments) {
      this._data.comments = data.comments;
    }
  }
}
