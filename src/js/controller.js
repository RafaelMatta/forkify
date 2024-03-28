import * as model from './model.js'
import recipeView from './view/recipeView.js';
import resultsView from './view/resultsView.js';
import searchView from './view/searchView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

if (module.hot) {
  module.hot.accept();
}

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

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    const query = searchView.getQuery();
    if (!query) return;

    await model.loadSearchResults(query);

    resultsView.render(model.state.search.results);
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