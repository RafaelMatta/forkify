import { API_URL, KEY, PER_PAGE_LIMIT } from "./config";
import { AJAX } from "./helpers";

export const state = {
    recipe: {},
    search: {
        query: '',
        results: [],
        page: 1,
        resultsPerPage: PER_PAGE_LIMIT,
    },
    bookmarks: [],
}

export const createRecipeObject = function (data) {
    const { recipe } = data.data;
    state.recipe = {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        ingredients: recipe.ingredients,
        servings: recipe.servings,
        cookingTime: recipe.cooking_time,
        sourceUrl: recipe.source_url,
        image: recipe.image_url,
        ...(recipe.key && { key: recipe.key }),
    }
}

export const loadRecipe = async function (id) {
    try {
        const data = await AJAX(`${API_URL}${id}?key=${KEY}`)

        createRecipeObject(data);

        if (state.bookmarks.some(bookmark => id === bookmark.id))
            state.recipe.bookmarked = true;

    } catch (err) {
        throw (err);
    }
}

export const loadSearchResults = async function (query) {
    try {
        state.search.query = query;

        const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`)

        state.search.results = data.data.recipes.map(recipe => {
            return {
                id: recipe.id,
                title: recipe.title,
                publisher: recipe.publisher,
                image: recipe.image_url,
                ...(recipe.key && { key: recipe.key }),
            }
        })

        state.search.page = 1;
    } catch (err) {
        throw (err);
    }
}

export const getSearchResultsPage = function (page = state.search.page) {
    state.search.page = page;

    const start = (page - 1) * state.search.resultsPerPage;
    const end = page * state.search.resultsPerPage;

    return state.search.results.slice(start, end);
}

export const updateServings = function (newServings) {
    state.recipe.ingredients.forEach(ingredient => {
        ingredient.quantity *= newServings / state.recipe.servings;
    });

    state.recipe.servings = newServings;
}

const persistBookmarks = function () {
    localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
}


export const addBookmark = function (recipe) {
    state.bookmarks.push(recipe);

    if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
    persistBookmarks();
}

export const removeBookmark = function (id) {
    const index = state.bookmarks.findIndex(bookmark => id === bookmark.id);
    state.bookmarks.splice(index, 1);
    state.recipe.bookmarked = false;

    persistBookmarks();
}

export const getBookmarks = function () {
    const storage = localStorage.getItem('bookmarks');
    if (storage) state.bookmarks = JSON.parse(storage);
}

export const uploadRecipe = async function (newRecipe) {
    try {
        const ingredients = Object.entries(newRecipe)
            .filter(data => data[0].startsWith('ingredient') && data[1] !== '')
            .map(ingredient => {
                const ingredientArray = ingredient[1].split(',').map(item => item.trim());

                if (ingredientArray.length !== 3)
                    throw new Error('Invalid ingredient format!');

                const [quantity, unit, description] = ingredientArray;

                return { quantity: quantity ? +quantity : null, unit, description }
            });

        const recipe = {
            title: newRecipe.title,
            publisher: newRecipe.publisher,
            source_url: newRecipe.sourceUrl,
            image_url: newRecipe.image,
            cooking_time: +newRecipe.cookingTime,
            servings: +newRecipe.servings,
            ingredients,
        }

        const data = await AJAX(`${API_URL}?key=${KEY}`, recipe)

        createRecipeObject(data);
        addBookmark(state.recipe);
    } catch (err) {
        throw err;
    }

}

const init = function () {
    getBookmarks();
}

init();