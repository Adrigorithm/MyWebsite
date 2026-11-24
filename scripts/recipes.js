class RecipeController {
  #recipeList = undefined;
  #recipeListSearch = undefined;
  #recipeListEntries = [];
  #initialisationDone = false;

  constructor(recipeList, recipes) {
    this.#recipeList = recipeList;

    this.#recipeListSearch = recipeList.children[0];
    this.#recipeListSearch.addEventListener("input", (e) => {
      if (this.#initialisationDone)
        this.buildRecipeList(e.target.value);
    });

    for (const p of recipeList.children[1].children)
      this.#recipeListEntries.push(p.textContent);

    this.#initialisationDone = true;
  }

  buildRecipeList(filter) {
    filter = filter.trim().toLowerCase();
    let listEntries = [];

    for (const listEntry of this.#recipeListEntries) {
      let listEntryLower = listEntry.toLowerCase();
      let indexOfFilter = listEntryLower.indexOf(filter);

      if (indexOfFilter === -1)
        continue;

      let p = document.createElement("p");
      let matchEnd = indexOfFilter + filter.length;
      p.innerHTML = `${listEntry.substring(0, indexOfFilter)}<span class="font-bold">${listEntry.substring(indexOfFilter, matchEnd)}</span>${listEntry.substring(matchEnd)}`;
      listEntries.push(p);
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
