import RecipeView from "./recipeView";
import View from "./view";
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
    _parentElement = document.querySelector('.pagination');

    _generateMarkup() {
        const currentPage = this._data.page;
        const totalPagesNumber = Math.ceil(this._data.results.length / this._data.resultsPerPage);

        if (currentPage === 1 && totalPagesNumber > 1)
            return this.#generateMarkupNextButton(currentPage);

        if (currentPage === totalPagesNumber && totalPagesNumber > 1)
            return this.#generateMarkupPreviousButton(currentPage);

        if (currentPage < totalPagesNumber)
            return `${this.#generateMarkupNextButton(currentPage)}${this.#generateMarkupPreviousButton(currentPage)}`

        return '';
    }

    #generateMarkupNextButton(currentPage) {
        return `
            <button data-goTo="${currentPage + 1}" class="btn--inline pagination__btn--next">
                <span>${currentPage + 1}</span>
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>
    `
    }

    #generateMarkupPreviousButton(currentPage) {
        return `
        <button data-goto="${currentPage - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>${currentPage - 1}</span>
        </button>
        `
    }

    addHandlerClick(handler) {
        this._parentElement.addEventListener('click', (e) => {
            const button = e.target.closest('.btn--inline');
            if (!button) return;

            const goToPage = +button.dataset.goto;

            handler(goToPage);
        })
    }
}

export default new PaginationView();