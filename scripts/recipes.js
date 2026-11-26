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

    for (const recipe of recipes) {
      const ingredientsContainer = recipe.getElementsByClassName("recipe-ingredients")[0];
      const ingredientsContainerDivs = ingredientsContainer.getElementsByTagName("div");

      ingredientsContainerDivs[0].getElementsByTagName("input")[0].addEventListener("change", (e) => {
        let servings = Number.parseInt(e.target.value);

        if (isNaN(servings)) {
          e.target.value = e.target.placeholder;
          servings = e.target.value;
        } else if (servings < e.target.min) {
          e.target.value = e.target.min;
          servings = e.target.value;
        }

        for (let i = 1; i < ingredientsContainerDivs.length; i++) {
          const ingredientComponents = ingredientsContainerDivs[i].querySelectorAll("p > span")
          const amountSpan = ingredientComponents[0];
          const unitSpan = ingredientComponents[1];
          let amount = amountSpan.dataset.base * servings;

          switch (unitSpan.innerText) {
            case "g":
              if (amount >= 1000) {
                amount = (amount / 1000).toFixed(3);
                unitSpan.innerText = "kg";
              } else {
                amount = amount.toFixed();
              }

              break;
            case "kg":
              if (amount >= 1000) {
                amount = (amount / 1000).toFixed(3);
              }
              else {
                amount = amount.toFixed();
                unitSpan.innerText = "g";
              }

              break;
            case "p":
              amount = amount.toFixed();
              break;
            case "tsp":
              amount = (amount * 4).toFixed() / 4;

              break;
          }

          amountSpan.innerText = amount;
        }
      });
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
