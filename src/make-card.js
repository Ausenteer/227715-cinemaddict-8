export default (title, rating, year, duration, genre, poster, description, comments, noControls = false) => `<article 
class="film-card ${noControls ? `film-card--no-controls` : ``}">
  <h3 class="film-card__title">${title}</h3>
  <p class="film-card__rating">${rating}</p>
  <p class="film-card__info">
    <span class="film-card__year">${year}</span>
    <span class="film-card__duration">${duration}</span>
    <span class="film-card__genre">${genre}</span>
  </p>
  <img src="./images/posters/${poster}.jpg" alt="" class="film-card__poster">
  <p class="film-card__description">${description}</p>
  <button class="film-card__comments">${comments}</button>
  <form class="film-card__controls">
    <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">
      <!--Add to watchlist--> WL</button>
    <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">
      <!--Mark as watched-->WTCHD</button>
    <button class="film-card__controls-item button film-card__controls-item--favorite">
      <!--Mark as favorite-->FAV</button>
  </form>
  </article>`;
