import * as model from './model.js'
import recipeView from './view/recipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import searchView from './view/searchView.js';

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    await model.loadRecipe(id);

    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
}

const controlSearchResults = async function (query) {
  try {
    await model.loadSearchResults(query);
    console.log(model.state.search.results)
  } catch (err) {
    console.log(err);
  }
}

const init = function () {
  recipeView.addHandleRender(controlRecipes);
  searchView.addSearchHandler(controlSearchResults);
}

init();
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////