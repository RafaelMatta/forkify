import View from "./view";

import icons from 'url:../../img/icons.svg';

class Results extends View {
    _parentElement = document.querySelector('.results');
    _errorMessage = `No recipes found for your query. Please try again!`;
    _defaultMessage = ``;


    _generateMarkup() {
        return this._data.map(this._generateMarkupPreview).join('');
    }

    _generateMarkupPreview(data) {
        return `
            <li class="preview">
                <a class="preview__link preview__link--active" href="#${data.id}">
                    <figure class="preview__fig">
                        <img src="${data.image}" alt="${data.title}" />
                    </figure>
                    <div class="preview__data">
                        <h4 class="preview__title">${data.title}</h4>
                        <p class="preview__publisher">${data.publisher}</p>
                        <div class="preview__user-generated">
                            <svg>
                                <use href="${icons}#icon-user"></use>
                            </svg>
                        </div>
                    </div>
                </a>
            </li>
        `
    }
}

export default new Results();