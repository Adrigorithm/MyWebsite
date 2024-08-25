"use strict"

import { OvenMode, WriteMode } from "./enums.js";
import { NotImplementedException } from "./exceptions.js";
import { SetTextContent } from "./utilities.js";

class RecipeWindow {
    #recipes = [];

    constructor(recipes) {
        this.#recipes = recipes;
    }

    ToDOMElements() {
        let recipeSection = document.createElement("section");
        recipeSection.setAttribute("id", "recipes");
        recipeSection.classList.add("flex", "flex-col", "justify-center", "items-center");

        let recipeSectionHead = document.createElement("h2");
        recipeSectionHead.classList.add("p-2", "m-0", "font-youngSerif");
        SetTextContent(recipeSectionHead, WriteMode.SET, document.createTextNode("Recipes"));

        let recipeSectionThumbnail = document.createElement("div");
        recipeSectionThumbnail.classList.add("flex", "gap-x-2.5");

        recipeSection.append(recipeSectionHead, recipeSectionThumbnail);

        for (let index = 0; index < this.#recipes.length; index++) {
            let recipeContainer = document.createElement("section");
            recipeContainer.classList.add("flex", "flex-col", "inset-[8%]", "fixed", "opacity-90", "bg-transPink", "dark:bg-fluoPink", "hidden");

            let headerContainer = document.createElement("div");
            headerContainer.classList.add("flex", "flex-row", "items-center", "hidden");

            let headerTitle = document.createElement("h3");
            SetTextContent(headerTitle, WriteMode.SET, document.createTextNode(this.#recipes[index].name));
            headerTitle.classList.add("grow", "m-0", "text-center");

            let servingsModifier = document.createElement("input");
            servingsModifier.classList.add("dark:bg-fluoPink", "bg-transPink", "mr-1", "text-fluoPink", "dark:text-transPink", "border-2", "border-nightBlack", "dark:border-transWhite")
            servingsModifier.addEventListener("input", () => {
                if (Number.isInteger(Number.parseFloat(servingsModifier.value)) && servingsModifier.value > 0) {
                    this.#recipes[index].ingredients.forEach(ingredient => {
                        ingredient.UpdateQantities(this.#recipes[index].servings, servingsModifier.value);
                    });

                    this.#recipes[index].servings = servingsModifier.value;
                    ingredientsContainer.lastChild.remove();
                    ingredientsContainer.appendChild(this.GenerateIngredients(index));
                }
            });
            servingsModifier.value = this.#recipes[index].servings;

            let closeButtonAnchor = document.createElement("a");
            closeButtonAnchor.setAttribute("href", "javascript: void(0);");

            let closeButtonImg = document.createElement("img");
            closeButtonImg.setAttribute("src", "/assets/img/close.svg");
            closeButtonImg.classList.add("h-8", "w-8", "bg-transWhite", "p-2");
            closeButtonImg.setAttribute("alt", "CloseRecipeWindow");

            let recipeThumbnailImage = document.createElement("img");
            recipeThumbnailImage.setAttribute("src", `${this.#recipes[index].image}`);
            recipeThumbnailImage.setAttribute("alt", `recipe id: ${index}`);

            closeButtonAnchor.appendChild(closeButtonImg);
            headerContainer.append(headerTitle, servingsModifier, closeButtonAnchor);

            let ingredientsContainer = document.createElement("div");
            ingredientsContainer.classList.add("flex", "flex-col");

            let ingredientsTitle = document.createElement("h4");
            ingredientsTitle.classList.add("text-center");
            SetTextContent(ingredientsTitle, WriteMode.SET, document.createTextNode("Ingredients"));

            ingredientsContainer.append(ingredientsTitle, this.GenerateIngredients(index));

            let instructionsContainer = document.createElement("div");
            instructionsContainer.classList.add("flex", "flex-col");

            let instructionsTitle = document.createElement("h4");
            instructionsTitle.classList.add("text-center");
            SetTextContent(instructionsTitle, WriteMode.SET, document.createTextNode("Instructions"));

            let instructionsList = document.createElement("ol");

            this.#recipes[index].instructions.forEach(instruction => {
                let instructionsListItem = document.createElement("li");
                SetTextContent(instructionsListItem, WriteMode.SET, document.createTextNode(instruction));
                instructionsList.appendChild(instructionsListItem);
            });

            instructionsContainer.append(instructionsTitle, instructionsList);

            let recipeWrapper = document.createElement("div");
            recipeWrapper.classList.add("flex", "flex-col", "lg:flex-row", "mx-2", "hidden");

            // Add recipe thumbnails
            let recipeThumbnailName = document.createElement("p");
            recipeThumbnailName.classList.add("text-center", "my-2");
            SetTextContent(recipeThumbnailName, WriteMode.SET, document.createTextNode(`${this.#recipes[index].name}`));

            let recipeThumbnailLink = document.createElement("a");
            recipeThumbnailLink.classList.add("no-underline", "text-nightBlack", "dark:text-transWhite");
            recipeThumbnailLink.setAttribute("href", "javascript: void(0);");

            recipeThumbnailLink.addEventListener("click", () => {
                this.Show(recipeContainer.classList, headerContainer.classList, recipeWrapper.classList);
            });

            closeButtonAnchor.addEventListener("click", () => {
                this.Hide(recipeContainer.classList, headerContainer.classList, recipeWrapper.classList);
            })

            recipeThumbnailLink.append(recipeThumbnailImage, recipeThumbnailName);
            recipeSectionThumbnail.appendChild(recipeThumbnailLink);
            recipeWrapper.append(ingredientsContainer, instructionsContainer);
            recipeContainer.append(headerContainer, recipeWrapper);
            recipeSection.appendChild(recipeContainer);
        }

        return recipeSection;
    }

    GenerateIngredients(recipeIndex) {
        let ingredientsList = document.createElement("ul");

        this.#recipes[recipeIndex].ingredients.forEach(ingredient => {
            let ingredientsListItem = document.createElement("li");
            SetTextContent(ingredientsListItem, WriteMode.SET, document.createTextNode(ingredient.ToHumanReadable()));
            ingredientsList.appendChild(ingredientsListItem);
        });

        return ingredientsList;
    }

    Show(recipeContainerClassList, headerContainerClassList, recipeMainClassList) {
        recipeContainerClassList.remove("hidden");
        headerContainerClassList.remove("hidden");
        recipeMainClassList.remove("hidden");
    }

    Hide(recipeContainerClassList, headerContainerClassList, recipeMainClassList) {
        recipeContainerClassList.add("hidden");
        headerContainerClassList.add("hidden");
        recipeMainClassList.add("hidden");
    }
}

class Recipe {
    name = "unnamed";
    ingredients = [];
    image = "/assets/img/placeholder.webp";
    ovenSettings = null;
    servings = -1;
    instructions = [];
    difficulty = -1;

    constructor(name, ingredients, image, ovenSettings, servings, instructions, difficulty) {
        this.name = name;
        this.ingredients = ingredients;
        this.image = image;
        this.ovenSettings = ovenSettings;
        this.servings = servings;
        this.instructions = instructions;
        this.difficulty = difficulty;
    }
}

class Ingredient {
    constructor(name, quantity, unit, alternatives, isAlternative) {
        this.name = name;
        this.quantity = quantity;
        this.unit = unit;
        this.alternatives = alternatives;
        this.isAlternative = isAlternative;
    }

    UpdateQantities(factorOld, factorNew) {
        this.quantity = this.quantity * factorNew / factorOld;
    }

    ToHumanReadable() {
        let quantityRounded = this.quantity;
        let unitFormatted = this.unit;

        switch (this.unit) {
            case 'p':
                if (!Number.isInteger(this.quantity)) {
                    quantityRounded = Math.round(this.quantity);
                }

                if (quantityRounded == 0) {
                    unitFormatted = `${unitFormatted} ... really?`;
                }

                break;
            case "tsp":
                if (!Number.isInteger(this.quantity)) {
                    quantityRounded = this.quantity.toFixed(2);
                }
                
                break;
            case 'g':
            case "kg":
                let thousands = this.quantity / 1000;
                if (thousands >= 1) {
                    unitFormatted = "kg";
                    quantityRounded = quantityRounded / 1000;

                    if (!Number.isInteger(quantityRounded)) {
                        quantityRounded = quantityRounded.toFixed(3);
                    }
                } else {
                    if (!Number.isInteger(quantityRounded)) {
                        quantityRounded = Math.round(quantityRounded);
                    }
                }

                break;
            default:
                break;
        }

        return `${this.name} ${quantityRounded}${unitFormatted}`;
    }
}

class OvenSettings {
    ovenMode = OvenMode.TRADITIONAL;
    degrees = -1;
    minutes = -1;

    /**
     * Creates a new object representing oven settings
     * @param ovenMode A string to an image displaying the mode of the oven
     * @param degrees Degrees in Celcius
     */
    constructor(ovenMode, degrees, minutes) {
        this.ovenMode = ovenMode;
        this.degrees = degrees;
        this.minutes = minutes;
    }

    ConvertTo(unit) {
        switch (unit) {
            case 'C':
                return this.degrees;
            case 'F':
                return this.degrees * 1.8 + 32;
            case 'K':
                this.degrees + 273.15;
            default:
                throw new NotImplementedException("Use any value from the Temperature enum");
        }
    }
}

export { RecipeWindow, Recipe, Ingredient, OvenSettings }