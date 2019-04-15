export default class ParseFilm {
  constructor(data) {
    this.id = data[`id`];
    this.title = data.film_info[`title`];
    this.poster = data.film_info[`poster`];
    this.description = data.film_info[`description`];
    this.alternativeTitle = data.film_info[`alternative_title`];
    this.alreadyWatched = data.user_details[`already_watched`];
    this.favorite = data.user_details[`favorite`];
    this.personalRating = data.user_details[`personal_rating`];
    this.watchlist = data.user_details[`watchlist`];
    this.userComments = data[`comments`];
    this.actors = data.film_info[`actors`];
    this.duration = data.film_info[`runtime`];
    this.writers = data.film_info[`writers`];
    this.userDetails = data[`user_details`];
    this.ageRating = data.film_info[`age_rating`] || ``;
    this.director = data.film_info[`director`];
    this.genre = data.film_info[`genre`];
    this.year = data.film_info.release[`date`];
    this.country = data.film_info.release[`release_country`];
    this.rating = data.film_info[`total_rating`];
  }

  toRAW() {
    return {
      'id': this.id,
      'film_info': {
        'actors': this.actors,
        'alternative_title': this.alternativeTitle,
        'age_rating': this.ageRating,
        'description': this.description,
        'director': this.director,
        'genre': this.genre,
        'poster': this.poster,
        'release': {
          'date': this.year,
          'release_country': this.country,
        },
        'runtime': this.duration,
        'title': this.title,
        'total_rating': this.rating,
        'writers': this.writers
      },
      'user_details': {
        'watchlist': this.watchlist,
        'already_watched': this.alreadyWatched,
        'personal_rating': this.personalRating,
        'favorite': this.favorite
      },
      'comments': this.userComments,
    };
  }
  static parseFilm(data) {
    return new ParseFilm(data);
  }

  static parseFilms(data) {
    return data.map(ParseFilm.parseFilm);
  }
}
