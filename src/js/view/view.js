import icons from 'url:../../img/icons.svg';

export default class View {
    _data;

    render(data) {
        if (!data || Array.isArray(data) && data.length === 0)
            return this.renderError();

        this._data = data;
        const markup = this._generateMarkup();
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    update(data) {
        if (!data || Array.isArray(data) && data.length === 0)
            return this.renderError();

        this._data = data;
        const newMarkup = this._generateMarkup();

        const newMarkupDOM = document.createRange().createContextualFragment(newMarkup);
        const newElements = Array.from(newMarkupDOM);
        const currentElements = Array.from(this._parentElement.querySelectorAll('*'));

        newElements.forEach((newElement, i) => {
            const currentElement = currentElements[i];

            if (!currentElement.firstChild?.nodeValue.trim()
                && currentElement.isEqualNode(newElement)) {
                currentElement.textContent = newElement.textContent;
            }

            if (currentElement.isEqualNode(newElement)) {
                Array.from(newElement).forEach(attribute => {
                    currentElement.setAttribute(attribute.name, attribute.value)
                })
            }
        })
    }

    renderSpinner() {
        const markup = `
          <div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
          </div>
        `

        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    _clear() {
        this._parentElement.innerHTML = '';
    }

    renderError(message = this._errorMessage) {
        const markup = `
        <div class="error">
            <div>
            <svg>
                <use href="${icons}#icon-alert-triangle"></use>
            </svg>
            </div>
            <p>${message}</p>
        </div> -->`

        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    renderMessage(message = this._defaultMessage) {
        const markup = `
        <div class="message">
            <div>
            <svg>
                <use href="${icons}#icon-smile"></use>
            </svg>
            </div>
            <p>${message}</p>
        </div>`

        this._parentElement.innerHTML = '';
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }
}