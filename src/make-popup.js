import moment from 'moment';

const CONTROLS = [
  {
    name: `watchlist`,
    label: `Add to watchlist`
  },
  {
    name: `watched`,
    label: `Already watched`
  },
  {
    name: `favorite`,
    label: `Add to favorites`
  }
];

const EMOJI = [
  {
    icon: `😴`,
    name: `sleeping`
  },
  {
    icon: `😐`,
    name: `neutral-face`
  },
  {
    icon: `😀`,
    name: `grinning`
  }
];

const getEmoji = (name) => {
  switch (name) {
    case `sleeping`: return `😴`;
    case `neutral-face`: return `😐`;
    case `grinning`: return `😀`;
    default: return `😀`;
  }
};

const makeEmoji = () => (
  `<div class="film-details__emoji-list">
    ${EMOJI.map((emoji) => (
    `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji.name}" value="${emoji.name}" ${emoji.isChecked ? `checked` : ``}>
    <label class="film-details__emoji-label" for="emoji-${emoji.name}">${emoji.icon}</label>`
  )).join(``)}
  </div>`
);

const makeComments = (data) => (
  data.userComments.map((comment) => (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">${getEmoji(comment.emotion)}</span>
      <div>
        <p class="film-details__comment-text">${comment.comment}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${comment.author}</span>
          <span class="film-details__comment-day">${moment(comment.time).fromNow()}</span>
        </p>
      </div>
    </li>`)
  ).join(``));

const makeControls = () => (
  `<section class="film-details__controls">
    ${CONTROLS.map((control) => (
    `<input type="checkbox" class="film-details__control-input visually-hidden" id="${control.name}" name="${control.name}">
     <label for="${control.name}" class="film-details__control-label film-details__control-label--${control.name}">${control.label}</label>`
  )).join(``)}
  </section>`
);

export const makeScore = (film) => {
  const arr = [];
  for (let i = 1; i < 11; i++) {
    arr.push(`
      <input type="radio" name="score" class="film-details__user-rating-input visually-hidden"
      value="${i}" id="rating-${i}" ${i === Math.floor(film.rating) ? `checked` : ``}>
      <label class="film-details__user-rating-label" for="rating-${i}">${i}</label>
    `);
  }
  return (
    `<div class="film-details__user-rating-score">
      ${arr.join(``)}
    </div>`
  );
};

const makeGenre = (film) => {
  const block = [...(film.genre)].map((genre) => (
    `<span class="film-details__genre">${genre}, </span>`
  )).join(``);

  return (
    `<tr class="film-details__row">
      <td class="film-details__term">Genres</td>
      <td class="film-details__cell">
      ${block}
    </tr>`);
};

const makeDuration = (film) => (
  `<tr class="film-details__row">
    <td class="film-details__term">Runtime</td>
    <td class="film-details__cell">${film.duration} m</td>
  </tr>`
);

export const makeCommentsBlock = (film) => (
  `<section class="film-details__comments-wrap">
      <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${film.userComments.length}</span></h3>
      ${makeComments(film)}
      <div class="film-details__new-comment">
        <div>
          <label for="add-emoji" class="film-details__add-emoji-label">😐</label>
          <input type="checkbox" class="film-details__add-emoji visually-hidden" id="add-emoji">
         ${makeEmoji()}
        </div>
        <label class="film-details__comment-label">
          <textarea class="film-details__comment-input" placeholder="← Select reaction, add comment here" name="comment"></textarea>
        </label>
      </div>
    </section>`
);

export const makeRating = (film) => (
  `<div class="film-details__rating">
  <p class="film-details__total-rating">${film.rating}</p>
  <p class="film-details__user-rating">Your rate ${Math.floor(film.rating)}</p>
</div>`
);

export const makePopup = (data) => (`<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${data.poster}" alt="${data.title}">
          <p class="film-details__age">${data.ageRating}+</p>
        </div>
        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${data.title}</h3>
              <p class="film-details__title-original">Original: ${data.alternativeTitle}</p>
            </div>
            ${makeRating(data)}
          </div>
          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${data.director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${data.writers}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${data.actors}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${data.year} (${data.country})</td>
            </tr>
            ${makeDuration(data)}
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${data.country}</td>
            </tr>
            ${makeGenre(data)}
          </table>
          <p class="film-details__film-description">
            ${data.description}
          </p>
        </div>
      </div>
    ${makeControls()}
    ${makeCommentsBlock(data)}
    <section class="film-details__user-rating-wrap">
      <div class="film-details__user-rating-controls">
        <span class="film-details__watched-status film-details__watched-status--active">Already watched</span>
        <button class="film-details__watched-reset" type="button">undo</button>
      </div>
      <div class="film-details__user-score">
        <div class="film-details__user-rating-poster">
          <img src="${data.poster}" alt="film-poster" class="film-details__user-rating-img">
        </div>
        <section class="film-details__user-rating-inner">
          <h3 class="film-details__user-rating-title">${data.title}</h3>
          <p class="film-details__user-rating-feelings">How you feel it?</p>
          
          ${makeScore(data)}
        </section>
      </div>
    </section>
  </form>
</section>`);
