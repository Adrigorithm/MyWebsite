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
        let recipes = [];

        for (let index = 0; index < this.#recipes.length; index++) {
            let headerContainer = document.createElement("div");
            headerContainer.classList.add("flex", "flex-row", "items-center");

            let headerTitle = document.createElement("h3");
            SetTextContent(headerTitle, WriteMode.SET, document.createTextNode(this.#recipes[index].name));
            headerTitle.classList.add("grow", "m-0", "text-center");

            let closeButtonLink = document.createElement("a");
            closeButtonLink
        }
    }
}

class Recipe{
    name = "unnamed";
    ingredients = [];
    image = "/assets/img/placeholder.webp";
    ovenSettings = null;
    servings = -1;
    instructions = "";
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

    ActiveItemChange(container, next){
        if (next && this.#activeFrame + 1 <= this.#timeLineFrames.length) {
            container.children[this.#activeFrame].classList.add("!hidden");
            this.#activeFrame++;
            container.children[this.#activeFrame].classList.remove("!hidden");
        } else if (!next && this.#activeFrame - 1 > 0) {
            container.children[this.#activeFrame].classList.add("!hidden");
            this.#activeFrame--;
            container.children[this.#activeFrame].classList.remove("!hidden");
        }
    }
}

class Ingedient{
    constructor(name, quantity, unit, isAlternative){
        this.name = name;
        this.quantity = quantity;
        this.unit = unit;
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