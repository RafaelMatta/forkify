import { API_URL } from "./config";
import { getJSON } from "./helpers";

export const state = {
    recipe: {},
}

export const loadRecipe = async function (id) {
    try {
        const data = await getJSON(`${API_URL}${id}`)

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
        }
    } catch (err) {
        throw (err);
    }
}