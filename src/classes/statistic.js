import {Component} from './component';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

export default class Statistic extends Component {
  constructor(data) {
    super();
    this._countWatched = data.filter((el) => el.alreadyWatched === true);
    this._commonDuration = this._countWatched.reduce((acc, film) => acc + film.duration, 0);
    const allGenres = this._countWatched.reduce((acc, film) => acc.concat(film.genre), []);
    const topGenre = allGenres.reduce((acc, item) => {
      if (acc[item]) {
        acc[item]++;
      } else {
        acc[item] = 1;
      }
      return acc;
    }, {});
    this._genresSort = Object.entries(topGenre).sort((a, b) => b[1] - a[1]);
    this._statisticRender = this._statisticRender.bind(this);
  }
  calcStatistic() {
    const statisticCtx = this._element.querySelector(`.statistic__chart`);
    const BAR_HEIGHT = 50;
    statisticCtx.height = BAR_HEIGHT * this._genresSort.length;
    const myChart = new Chart(statisticCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: this._genresSort.map((el) => el[0]),
        datasets: [{
          data: this._genresSort.map((el) => el[1]),
          backgroundColor: `#ffe800`,
          hoverBackgroundColor: `#ffe800`,
          anchor: `start`
        }]
      },
      options: {
        plugins: {
          datalabels: {
            font: {
              size: 20
            },
            color: `#ffffff`,
            anchor: `start`,
            align: `start`,
            offset: 40,
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: `#ffffff`,
              padding: 100,
              fontSize: 20
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            barThickness: 24
          }],
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
          }],
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        }
      }
    });
    return myChart;
  }

  set statisticRender(fn) {
    this._statisticRender = fn;
  }

  _statisticRender(e) {
    e.preventDefault();
    return typeof this._statisticRender === `function` && this._statisticRender(e);
  }

  _bind() {
    document.querySelector(`.main-navigation__item--additional`).addEventListener(`click`, this._statisticRender);
  }

  unbind() {
    document.querySelector(`.main-navigation__item--additional`).removeEventListener(`click`, this._statisticRender);
  }

  update(data) {
    this._countWatched = data.filter((el) => el.alreadyWatched === true);
    this._commonDuration = this._countWatched.reduce((acc, film) => acc + film.duration, 0);
    const allGenres = this._countWatched.reduce((acc, film) => acc.concat(film.genre), []);
    const topGenre = allGenres.reduce((acc, item) => {
      if (acc[item]) {
        acc[item]++;
      } else {
        acc[item] = 1;
      }
      return acc;
    }, {});
    this._genresSort = Object.entries(topGenre).sort((a, b) => b[1] - a[1]);
  }


  get template() {
    return `<section class="statistic">
  <p class="statistic__rank">Your rank <span class="statistic__rank-label">Sci-Fighter</span></p>
  <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
    <p class="statistic__filters-description">Show stats:</p>
    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked>
    <label for="statistic-all-time" class="statistic__filters-label">All time</label>
    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
    <label for="statistic-today" class="statistic__filters-label">Today</label>
    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
    <label for="statistic-week" class="statistic__filters-label">Week</label>
    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
    <label for="statistic-month" class="statistic__filters-label">Month</label>
    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
    <label for="statistic-year" class="statistic__filters-label">Year</label>
  </form>
  <ul class="statistic__text-list">
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">You watched</h4>
      <p class="statistic__item-text">${this._countWatched.length} <span class="statistic__item-description">movies</span></p>
    </li>
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">Total duration</h4>
      <p class="statistic__item-text">${Math.floor(this._commonDuration / 60)} <span class="statistic__item-description">h</span> ${this._commonDuration % 60} <span class="statistic__item-description">m</span></p>
    </li>
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">Top genre</h4>
      <p class="statistic__item-text">${this._genresSort.length ? this._genresSort[0][0] : ``}</p>
    </li>
  </ul>
  <div class="statistic__chart-wrap">
    <canvas class="statistic__chart" width="1000"></canvas>
  </div>
  
</section>`.trim();
  }
}
