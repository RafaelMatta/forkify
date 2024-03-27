class SearchView {
    #parentElement = document.querySelector('.search');

    getQuery() {
        const query = this.#parentElement.querySelector('.search__field').value;
        this.#clearInput();
        console.log(query);
        return query;
    }

    addSearchHandler(handler) {
        this.#parentElement.addEventListener('submit', (e) => {
            e.preventDefault();
            handler(this.getQuery());
        })
    }

    #clearInput() {
        this.#parentElement.querySelector('.search__field').value = '';
    }
}

export default new SearchView(); 