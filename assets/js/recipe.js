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
            recipeContainer.classList.add("flex", "flex-col", "inset-[8%]", "fixed", "opacity-90", "bg-lightSteelBlue", "dark:bg-zaffre", "hidden");

            let headerContainer = document.createElement("div");
            headerContainer.classList.add("flex", "flex-row", "items-center", "hidden");

            let headerTitle = document.createElement("h3");
            SetTextContent(headerTitle, WriteMode.SET, document.createTextNode(this.#recipes[index].name));
            headerTitle.classList.add("grow", "m-0", "text-center");

            let closeButtonAnchor = document.createElement("a");
            closeButtonAnchor.setAttribute("href", "javascript: void(0);");

            let closeButtonImg = document.createElement("img");
            closeButtonImg.setAttribute("src", "/assets/img/cross.svg");
            closeButtonImg.classList.add("h-8", "w-8", "bg-white", "p-2");
            closeButtonImg.setAttribute("alt", "CloseRecipeWindow");

            let recipeThumbnailImage = document.createElement("img");
            recipeThumbnailImage.setAttribute("src", `${this.#recipes[index].image}`);
            recipeThumbnailImage.setAttribute("alt", `recipe id: ${index}`);

            closeButtonAnchor.appendChild(closeButtonImg);
            headerContainer.append(headerTitle, closeButtonAnchor);

            let ingredientsContainer = document.createElement("div");
            ingredientsContainer.classList.add("flex", "flex-col");

            let ingredientsTitle = document.createElement("h4");
            ingredientsTitle.classList.add("text-center");
            SetTextContent(ingredientsTitle, WriteMode.SET, document.createTextNode("Ingredients"));

            let ingredientsList = document.createElement("ul");

            this.#recipes[index].ingredients.forEach(ingredient => {
                let ingredientsListItem = document.createElement("li");
                SetTextContent(ingredientsListItem, WriteMode.SET, document.createTextNode(`${ingredient.name} ${ingredient.quantity}${ingredient.unit}`));
                ingredientsList.appendChild(ingredientsListItem);
            });

            ingredientsContainer.append(ingredientsTitle, ingredientsList);

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
            recipeThumbnailLink.classList.add("no-underline", "text-black", "dark:text-white");
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

    ToDOMElement() {

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