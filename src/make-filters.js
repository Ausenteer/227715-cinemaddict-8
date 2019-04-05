export const makeFilter = (filter) => (`<a 
        href="#" 
        class="main-navigation__item ${filter.state ? `main-navigation__item--${filter.state}` : ``}">
        ${filter.name} 
        ${filter.count ? `<span class="main-navigation__item-count">${filter.count}</span>` : ``}
      </a>`
);
