import {makePopup, makeRating, makeScore} from '../make-popup';
import {Component} from './component';

import cloneDeep from 'lodash.clonedeep';
import {createNewElement} from "../common";

export default class Popup extends Component {
  constructor(data) {
    super(data);
    this._data = cloneDeep(data);

    this._onCloseClick = this._onCloseClick.bind(this);
    this._onFormSubmit = this._onFormSubmit.bind(this);
    this._onChangeRating = this._onChangeRating.bind(this);
    this._onEnterInput = this._onEnterInput.bind(this);

    this._onClose = null;
    this._onSubmit = null;
  }
  get template() {
    return makePopup(this._data);
  }
  _updateDataForm(formData) {
    const entry = {};

    Array.from(formData.entries()).forEach(([property, value]) => Popup.createMapper(entry)[property] && Popup.createMapper(entry)[property](value));

    return entry;
  }

  set onClose(fn) {
    this._onClose = fn;
  }

  _onCloseClick() {
    return typeof this._onClose === `function` && this._onClose(this._data);
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  _getEmoji(key) {
    switch (key) {
      case `sleeping`:
        return `😴`;
      case `neutral-face`:
        return `😐`;
      case `grinning`:
        return `😀`;
      default:
        return ``;
    }
  }

  _onFormSubmit() {
    const formData = new FormData(this._element.querySelector(`.film-details__inner`));
    const data = this._updateDataForm(formData);
    const comments = this._data.comments.slice();

    comments.push({
      author: `Elena Ilina`,
      time: new Date(),
      comment: data.comment,
      emoji: this._getEmoji(data.emoji)
    });

    this._unbind();
    this.update({comments});
    this._updateRatingScoreOnPopup();
    this._bind();
    return typeof this._onSubmit === `function` && this._onSubmit(this._data);
  }

  _onEnterInput(evt) {
    if (evt.keyCode === 13) {
      this._onFormSubmit();
    }
  }

  static createMapper(target) {
    return {
      score: (value) => {
        target.rating = value;
      },
      comment: (value) => {
        target.comment = value;
      },
      [`comment-emoji`]: (value) => {
        target.emoji = value;
      }
    };
  }

  _onChangeRating(evt) {
    if (evt.target.tagName === `INPUT`) {
      const formData = new FormData(this._element.querySelector(`.film-details__inner`));
      const newData = this._updateDataForm(formData);

      this._unbind();
      this.update(newData);
      this._updateRatingScoreOnPopup();
      this._bind();
    }
  }

  update(data) {
    if (data.rating) {
      this._data.rating = data.rating;
    }

    if (data.comments) {
      this._data.comments = data.comments;
    }
  }
  _updateRatingScoreOnPopup() {
    const nextScore = createNewElement(makeScore(this._data));
    const prevScore = this._element.querySelector(`.film-details__user-rating-score`);

    const nextRating = createNewElement(makeRating(this._data));
    const prevRating = this._element.querySelector(`.film-details__rating`);

    prevScore.parentNode.replaceChild(nextScore, prevScore);
    prevRating.parentNode.replaceChild(nextRating, prevRating);
  }

  _bind() {
    this._element.querySelector(`.film-details__close-btn`).addEventListener(`click`, this._onCloseClick);
    this._element.querySelector(`.film-details__inner`).removeEventListener(`submit`, this._onFormSubmit);
    this._element.querySelector(`.film-details__user-rating-score`).addEventListener(`click`, this._onChangeRating);
    this._element.querySelector(`.film-details__comment-input`).addEventListener(`keydown`, this._onEnterInput);
  }
  _unbind() {
    this._element.querySelector(`.film-details__close-btn`).removeEventListener(`click`, this._onCloseClick);
    this._element.querySelector(`.film-details__inner`).removeEventListener(`submit`, this._onFormSubmit);
    this._element.querySelector(`.film-details__inner`).removeEventListener(`click`, this._onChangeRating);
    this._element.querySelector(`.film-details__comment-input`).removeEventListener(`keydown`, this._onEnterInput);
  }
}
