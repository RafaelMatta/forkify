import * as model from './model.js'
import recipeView from './view/recipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

const controlRecipes = async function () {
  try {

    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    await model.loadRecipe(id);

    recipeView.render(model.state.recipe);
  } catch (err) {
    alert(err);
  }
}

const init = function () {
  recipeView.addHandleRender(controlRecipes);
}

init();

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////