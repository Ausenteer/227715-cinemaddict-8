import {makeFilter} from '../make-filters';
import {Component} from "./component";

export default class Filter extends Component {
  constructor(data) {
    super(data);
    this._onFilterClick = this._onFilterClick.bind(this);
  }

  get template() {
    return makeFilter(this._data);
  }

  set onFilter(fn) {
    this._onFilter = fn;
  }

  _onFilterClick(event) {
    event.preventDefault();
    return typeof this._onFilter === `function` && this._onFilter(event);
  }

  _bind() {
    if (!this._element.className.includes(`item--additional`)) {
      this._element.addEventListener(`click`, this._onFilterClick);
    }
  }

  _unbind() {
    this._element.removeEventListener(`click`, this._onFilterClick);
  }
}
