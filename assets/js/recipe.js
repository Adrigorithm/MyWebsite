"use strict"

import { OvenMode, WriteMode } from "./enums";
import { NotImplementedException } from "./exceptions";
import { SetTextContent } from "./utilities";

class RecipeWindow{
    #recipes = [];
    #activeRecipe = -1;

    constructor(recipes){
        this.#recipes = recipes;
    }

    ToDOMElements(){
        let recipeContainer = document.createElement("section");
        recipeContainer.classList.add("flex flex-col inset-[8%] fixed opacity-75 bg-lightSteelBlue dark:bg-zaffre");
        
        for (let index = 0; index < this.#recipes.length; index++) {
            let headerContainer = document.createElement("div");
            headerContainer.classList.add("flex", "flex-row", "items-center");

            let headerTitle = document.createElement("h3");
            SetTextContent(headerTitle, WriteMode.SET, document.createTextNode(this.#recipes[index].name));
            headerTitle.classList.add("grow", "m-0", "text-center");

            let closeButtonAnchor = document.createElement("a");
            closeButtonAnchor.setAttribute("href", "javascript: void(0);");

            let closeButtonImg = document.createElement("img");
            closeButtonImg.setAttribute("src", "/assets/img/cross.svg")
            closeButtonImg.classList.add("h-8 w-8 bg-white p-2");
            closeButtonImg.setAttribute("alt", "CloseRecipeWindow")

            closeButtonAnchor.addEventListener("click", () => {
                Hide(index);
            })

            closeButtonAnchor.appendChild(closeButtonImg);
            headerContainer.append(headerTitle, closeButtonAnchor);

            let recipeMain = document.createElement("div");
            recipeMain.classList.add("flex flex-col lg:flex-row mx-2");

            let ingredientsContainer = document.createElement("div");
            ingredientsContainer.classList.add("border-r-zaffre dark:border-r-lightSteelBlue");

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
            ingredientsContainer.classList.add("grow");

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
            recipeMain.append(recipeContainer, instructionsContainer);
            recipeContainer.append(headerContainer, recipeMain);
        }
    }

    Hide(){

    }
}

class Recipe{
    name = "unnamed";
    ingredients = [];
    image = "/assets/img/placeholder.webp";
    ovenSettings = null;
    servings = -1;
    instructions = [];
    difficulty = -1;

    constructor(name, ingredients, image, ovenSettings, servings, instructions, difficulty){
        this.name = name;
        this.ingredients = ingredients;
        this.image = image;
        this.ovenSettings = ovenSettings;
        this.servings = servings;
        this.instructions = instructions;
        this.difficulty = difficulty;
    }

    ToDOMElement(){

    }
}

class Ingedient{
    constructor(name, quantity, unit, alternatives, isAlternative){
        this.name = name;
        this.quantity = quantity;
        this.unit = unit;
        this.alternatives = alternatives;
        this.isAlternative = isAlternative;
    }
}

class OvenSettings{
    ovenMode = OvenMode.TRADITIONAL;
    degrees = -1;

    constructor(ovenMode, degrees){
        this.ovenMode = ovenMode;
        this.degrees = degrees;
    }

    ConvertTo(unit){
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