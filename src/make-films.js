import moment from 'moment';

const countDuration = (duration) => (
  [
    Math.floor(duration / 60),
    duration % 60
  ]
);

const CONTROLS = [
  {
    name: `WL`,
    modificator: `add-to-watchlist`
  },
  {
    name: `WTCHD`,
    modificator: `mark-as-watched`
  },
  {
    name: `FAV`,
    modificator: `favorite`
  }
];

const makeControls = () => (
  `<form class="film-card__controls">
    ${CONTROLS.map((control) => (
    `<button class="film-card__controls-item button film-card__controls-item--${control.modificator}">
        ${control.name}
     </button>`
  ))}
  </form>`
);

export const makeFilm = (film, isControl) => {
  const [hour, min] = countDuration(film.duration);
  return (`<article class="film-card ${isControl ? `` : `film-card--no-controls`}">
    <h3 class="film-card__title">${film.title}</h3>
    <p class="film-card__rating">${film.rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${moment(film.year).format(`YYYY`)}</span>
      <span class="film-card__duration">${hour}h ${min}m</span>
      <span class="film-card__genre">${film.genre}</span>
    </p>
    <img src="${film.poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${film.description}</p>
    <button class="film-card__comments">${film.comments.length} comments</button>
${isControl ? makeControls() : ``}
</article>`);
};
