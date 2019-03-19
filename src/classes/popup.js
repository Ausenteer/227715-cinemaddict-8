import {makePopup} from '../make-popup';
import {createNewElement} from '../common';

export default class Popup {
  constructor(data) {
    this._data = data;
    this._element = null;
    this._onCloseClick = this._onCloseClick.bind(this);
  }
  get template() {
    return makePopup(this._data);
  }
  get element() {
    return this._element;
  }

  set onClose(fn) {
    this._onClose = fn;
  }

  _onCloseClick() {
    return typeof this._onClose === `function` && this._onClose();
  }

  bind() {
    this._element.querySelector(`.film-details__close-btn`).addEventListener(`click`, this._onCloseClick);
  }
  unbind() {
    this._element.querySelector(`.film-details__close-btn`).removeEventListener(`click`, this._onCloseClick);
  }

  render() {
    this._element = createNewElement(this.template);
    this.bind();

    return this._element;
  }

  unrender() {
    this.unbind();
    this._element = null;
  }
}