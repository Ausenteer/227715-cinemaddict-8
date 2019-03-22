import {makePopup} from '../make-popup';
import {Component} from './component';

export default class Popup extends Component {
  constructor(data) {
    super(data);
    this._onCloseClick = this._onCloseClick.bind(this);
  }
  get template() {
    return makePopup(this._data);
  }

  set onClose(fn) {
    this._onClose = fn;
  }

  _onCloseClick() {
    return typeof this._onClose === `function` && this._onClose();
  }

  _bind() {
    this._element.querySelector(`.film-details__close-btn`).addEventListener(`click`, this._onCloseClick);
  }
  _unbind() {
    this._element.querySelector(`.film-details__close-btn`).removeEventListener(`click`, this._onCloseClick);
  }

}
