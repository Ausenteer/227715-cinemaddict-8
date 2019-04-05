import {createNewElement} from '../common';

export class Component {
  constructor(data, isControl) {
    if (new.target === Component) {
      throw new Error(`Can't instantiate Component, only concrete one.`);
    }

    this._data = data;
    this.isControl = isControl;
    this._element = null;
  }

  get element() {
    return this._element;
  }

  get template() {
    throw new Error(`You have to define template.`);
  }

  _bind() {
    throw new Error(`You have to define bind.`);
  }

  _unbind() {
    throw new Error(`You have to define unbind.`);
  }

  render(selector) {
    this._element = createNewElement(this.template);
    selector.appendChild(this._element);

    this._bind();
  }

  unrender() {
    this._unbind();
    this._element = null;
  }
}
