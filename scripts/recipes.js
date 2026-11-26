class RecipeController {
  #recipeList = undefined;
  #recipeListSearch = undefined;
  #recipeListEntries = [];
  #initialisationDone = false;
  #recipeActiveTranslatable = "recipe0Title";
  #recipes = [];
  #translator = null;

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
      this.#recipeListEntries.push(button.textContent);
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

    this.#recipeActiveTranslatable = newRecipeTranslatable;
    oldRecipe.classList.add("hidden");
    newRecipe.classList.remove("hidden");
  }

  buildRecipeList(filter) {
    filter = filter.trim().toLowerCase();
    let listEntries = [];

    for (const listEntry of this.#recipeListEntries) {
      let listEntryLower = listEntry.toLowerCase();
      let indexOfFilter = listEntryLower.indexOf(filter);

      if (indexOfFilter === -1)
        continue;

      let button = document.createElement("button");
      let matchEnd = indexOfFilter + filter.length;
      button.innerHTML = `${listEntry.substring(0, indexOfFilter)}<span class="font-bold">${listEntry.substring(indexOfFilter, matchEnd)}</span>${listEntry.substring(matchEnd)}`;
      listEntries.push(button);
    }

    this.#recipeList.children[1].replaceChildren();
    this.#recipeList.children[1].append(...listEntries);
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
