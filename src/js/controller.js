const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

const getRecipe = async function () {
  try {
    const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886`);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    let { recipe } = data.data;
    recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      sourceUrl: recipe.source_url,
      imageUrl: recipe.image_url,
    }
  } catch (err) {
    alert(err);
  }
}
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////