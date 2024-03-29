class SearchView {
    _parentElement = document.querySelector('.search');

    getQuery() {
        const query = this._parentElement.querySelector('.search__field').value;
        return query;
    }

    addHandlerSearch(handler) {
        this._parentElement.addEventListener('submit', (e) => {
            e.preventDefault();
            handler(this.getQuery());
            this._clearInput();
        })
    }

    _clearInput() {
        this._parentElement.querySelector('.search__field').value = '';
    }
}

export default new SearchView(); 