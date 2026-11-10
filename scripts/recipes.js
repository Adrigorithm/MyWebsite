class RecipeController {
  #recipes

  constructor() {

  }

  async initialise() {
    const response = await fetch("/data/recipes.json");
    const result = await response.json();
    this.#recipes = new Recipes();

    result.forEach((recipe) => {
      this.#recipes.addRecipe(recipe);
    })

    console.log(result);
  }
}

class Recipes {
  #recipes = [];

  addRecipe(recipe) {
    this.#recipes.push(new Recipe(recipe));
  }
}

class Recipe {
  #ingredients = [];
  constructor(recipeJson) {

  }
}

class Ingredient {
  #alternatives = [];
  constructor(name) {

  }
}

export { RecipeController }
