class Recipe{
    constructor(name, ingredients, image, ovenSettings, servings, instructions, difficulty){
        this.#name = name;
        this.#ingredients = ingredients;
        this.#image = image;
        this.#ovenSettings = ovenSettings;
        this.#servings = servings;
        this.#insctructions = instructions;
        this.#difficulty = difficulty;
    }

    ToDOMElements(){
        
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