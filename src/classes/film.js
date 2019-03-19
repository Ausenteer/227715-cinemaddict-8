import {makeFilm} from '../make-films';
import {createNewElement} from '../common';

export default class Film {
  constructor(data, isControl) {
    this._data = data;
    this._element = null;
    this._isControl = isControl;
    this._onClick = this._onClick.bind(this);

    this._element = null;
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

  render(selector) {
    this._element = createNewElement(this.template);
    selector.appendChild(this._element);

    this.bind();
  }

  bind() {
    this._element.querySelector(`.film-card__comments`).addEventListener(`click`, this._onClick);
  }
}
