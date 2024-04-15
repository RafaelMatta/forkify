import previewView from "./previewView";
import View from "./view";

class AddRecipeView extends View {
    _parentElement = document.querySelector('.upload');
    _defaultMessage = `Recipe uploaded successfully`;

    _overlay = document.querySelector('.overlay');
    _window = document.querySelector('.add-recipe-window');
    _buttonOpen = document.querySelector('.nav__btn--add-recipe');
    _buttonClose = document.querySelector('.btn--close-modal');


    constructor() {
        super();
        this._addHandlerShowWindow();
        this._addHandlerHideWindow();
    }

    toggleWindow() {
        this._overlay.classList.toggle('hidden');
        this._window.classList.toggle('hidden');

        if (!this._overlay.classList.contains('hidden')) {
            this._clear();
            this._parentElement.insertAdjacentHTML("afterbegin", this._generateMarkup());
        }
    }

    _addHandlerShowWindow() {
        this._buttonOpen.addEventListener('click', this.toggleWindow.bind(this))
    }

    _addHandlerHideWindow() {
        this._buttonClose.addEventListener('click', this.toggleWindow.bind(this))
        this._overlay.addEventListener('click', this.toggleWindow.bind(this))
    }

    addHandlerSubmit(handler) {
        this._parentElement.addEventListener('submit', function (e) {
            e.preventDefault();
            const data = [...new FormData(this)];
            handler(data);
        })
    }

    _generateMarkup() {
        const markup = `
            <div class="upload__column">
                <h3 class="upload__heading">Recipe data</h3>
                <label>Title</label>
                <input required name="title" type="text" />
                <label>URL</label>
                <input required name="sourceUrl" type="text" />
                <label>Image URL</label>
                <input required name="image" type="text" />
                <label>Publisher</label>
                <input required name="publisher" type="text" />
                <label>Prep time</label>
                <input required name="cookingTime" type="number" />
                <label>Servings</label>
                <input required name="servings" type="number" />
            </div>

            <div class="upload__column">
                <h3 class="upload__heading">Ingredients</h3>
                <label>Ingredient 1</label>
                <input type="text" required name="ingredient-1"
                placeholder="Format: 'Quantity,Unit,Description'" />
                <label>Ingredient 2</label>
                <input type="text" name="ingredient-2" placeholder="Format: 'Quantity,Unit,Description'" />
                <label>Ingredient 3</label>
                <input type="text" name="ingredient-3" placeholder="Format: 'Quantity,Unit,Description'" />
                <label>Ingredient 4</label>
                <input type="text" name="ingredient-4" placeholder="Format: 'Quantity,Unit,Description'" />
                <label>Ingredient 5</label>
                <input type="text" name="ingredient-5" placeholder="Format: 'Quantity,Unit,Description'" />
                <label>Ingredient 6</label>
                <input type="text" name="ingredient-6" placeholder="Format: 'Quantity,Unit,Description'" />
            </div>

            <button class="btn upload__btn">
                <svg>
                <use href="src/img/icons.svg#icon-upload-cloud"></use>
                </svg>
                <span>Upload</span>
            </button>`

        return markup;
    }
}

export default new AddRecipeView();