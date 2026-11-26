class RecipeController {
  #recipeList = undefined;
  #recipeListSearch = undefined;
  #initialisationDone = false;
  #recipeActiveTranslatable = "recipe0Title";
  #recipes = [];

  constructor(recipeList, recipes) {
    this.#recipeList = recipeList;
    this.#recipes = recipes;

    this.#recipeListSearch = recipeList.children[0];
    this.#recipeListSearch.addEventListener("input", (e) => {
      if (this.#initialisationDone)
        this.buildRecipeList(e.target.value);
    });

    for (const button of recipeList.children[1].children) {
      button.addEventListener("click", () => {
        this.activateRecipe(button);
      })
    }

    this.#initialisationDone = true;
  }

  activateRecipe(button) {
    let newRecipeTranslatable = button.dataset.translatable;

    if (newRecipeTranslatable === this.#recipeActiveTranslatable)
      return;

    let newRecipe = null;
    let oldRecipe = null;

    for (const recipe of this.#recipes) {
      if (recipe.getElementsByTagName("h2")[0].dataset.translatable === newRecipeTranslatable) {
        newRecipe = recipe;

        continue;
      }

      if (recipe.getElementsByTagName("h2")[0].dataset.translatable === this.#recipeActiveTranslatable) {
        oldRecipe = recipe;
      }
    }

    this.getActiveRecipeButton().classList.remove("font-bold", "text-xl");
    oldRecipe.classList.add("hidden");
    button.classList.add("font-bold", "text-xl");
    newRecipe.classList.remove("hidden");

    this.#recipeActiveTranslatable = newRecipeTranslatable;
  }

  buildRecipeList(filter) {
    filter = filter.trim().toLowerCase();

    for (const button of this.#recipeList.children[1].children) {
      const buttonText = button.innerText.toLowerCase();
      const indexOfFilter = buttonText.indexOf(filter);

      if (indexOfFilter === -1) {
        button.classList.add("hidden");
        continue;
      }

      let matchEnd = indexOfFilter + filter.length;
      button.innerHTML = `${button.innerText.substring(0, indexOfFilter)}<span class="font-bold">${button.innerText.substring(indexOfFilter, matchEnd)}</span>${button.innerText.substring(matchEnd)}`;
      button.classList.remove("hidden");
    }
  }

  getActiveRecipeButton() {
    for (const button of this.#recipeList.children[1].children) {
      if (button.dataset.translatable === this.#recipeActiveTranslatable)
        return button;
    }
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
