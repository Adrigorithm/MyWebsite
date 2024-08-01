"use strict"

import { DataLoader } from "./jsonFetcher.js";
import { ContentType, Language, OvenMode, RequestMethod } from "./enums.js";
import { ScrollButtonController } from "./scrollEvents.js";
import { TimeLine, TimeLineFrame } from "./timeline.js";
import { Ingredient, OvenSettings, Recipe, RecipeWindow } from "./recipe.js";
import { GithubEmbedder } from "./githubEmbedder.js";
import { LanguageSwapper } from "./languageSwapper.js";

window.addEventListener("load", PageLoaded);

let scrollTopButton;
let languageSwapper;

function PageLoaded() {
    SetupLanguageSwapper();
    SetupScrollEvent();
    ConstructTimeLines();
    ConstructRecipes();
    GenereateGithubEmbeds("https://api.github.com/repos/Adrigorithm/Adribot", "https://api.github.com/repos/Adrigorithm/Adrigorithm.github.io", "https://api.github.com/repos/Adrigorithm/DeLijn.Net");
}

function SetupLanguageSwapper() {
    languageSwapper = new LanguageSwapper(document.getElementById("langSelector"));
}

function SetupScrollEvent() {
    scrollTopButton = new ScrollButtonController(
        document.getElementById("mainNav"),
        document.getElementById("toTopButton")
    );

    window.addEventListener("scroll", () => {
        scrollTopButton.CalculateVisibilityCheck(
            window.scrollY,
            document.getElementById("mainNav")
        )
    });
}

function GenereateGithubEmbeds(...urls) {
    let dataLoader = new DataLoader();

    urls.forEach(url => {
        dataLoader.FetchData(url, RequestMethod.GET, { "Accept": "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28" }).then((data) => {
            let html = GithubEmbedder.fromPublicRepoJSON(data);

            let githubEmbedParent = document.getElementById([data.name]);
            githubEmbedParent.appendChild(html);
        })
    });
}

function ConstructRecipes(lang) {
    let elementBefore = document.getElementById("projects");
    let dataLoader = new DataLoader();
    let recipes = [];
    let recipeWindow;
    let url = "";
    
    switch (languageSwapper.currentLanguage){
        case Language.ENGLISH:
            url = "/assets/json/en_uk/recipesV1.json";
            break;
        case Language.CATALAN:
            url = "/assets/json/cat/recipesV1.json";
            break;
        case Language.DUTCH:
            url = "/assets/json/nl_be/recipesV1.json"
            break;
    }

    dataLoader.FetchData(url, RequestMethod.GET, { "Content-Type": ContentType.JSON }).then((data) => {
        let recipesData = data.recipes;

        for (let index = 0; index < recipesData.length; index++) {
            let recipe;
            let ingredients = [];
            let ovenMode;

            // Ingredients
            recipesData[index].ingredients.forEach(ingredientData => {
                let ingredient = new Ingredient(
                    ingredientData.name,
                    ingredientData.quantity,
                    ingredientData.unit,
                    [],
                    false
                );

                ingredient.alternatives.push(...ingredientData.alternatives.map(altIngredient => new Ingredient(
                    altIngredient.name,
                    altIngredient.quantity,
                    altIngredient.unit,
                    null,
                    true
                )));
                ingredients.push(ingredient);
            });

            // Oven settings
            switch (recipesData[index].ovenSettings.mode.toUpperCase()) {
                case 'F':
                    ovenMode = OvenMode.FAN;
                    break;
                case 'T':
                    ovenMode = OvenMode.TRADITIONAL;
                    break;
                case 'FT':
                    ovenMode = OvenMode.FAN_TRADITIONAL;
                    break;
                default:
                    console.log(`Ovenmode ${recipesData[index].ovenSettings.mode} is not supported, defaulting to Traditional Mode`);
                    ovenMode = OvenMode.TRADITIONAL;
            }

            // Recipe :)
            recipe = new Recipe(
                recipesData[index].name,
                ingredients,
                recipesData[index].image,
                new OvenSettings(ovenMode, Number.parseInt(recipesData[index].ovenSettings.degrees), Number.parseInt(recipesData[index].ovenSettings.minutes)),
                Number.parseInt(recipesData[index].servings),
                recipesData[index].instructions,
                Number.parseInt(recipesData[index].difficulty)
            );

            recipes.push(recipe);
        };

        recipeWindow = new RecipeWindow(recipes);
        elementBefore.after(recipeWindow.ToDOMElements());
    });
}

function ConstructTimeLines(lang) {
    let timeLinesHtml = document.getElementsByClassName("timeline");
    let dataLoader = new DataLoader();
    let timeLines = [];
    let url = "";

    switch (languageSwapper.currentLanguage){
        case Language.ENGLISH:
            url = "/assets/json/en_uk/timelines.json";
            break;
        case Language.CATALAN:
            url = "/assets/json/cat/timelines.json";
            break;
        case Language.DUTCH:
            url = "/assets/json/nl_be/timelines.json"
            break;
    }

    dataLoader.FetchData(url, RequestMethod.GET, { "Content-Type": ContentType.JSON }).then((data) => {
        let timeLinesData = data.timelines;

        if (timeLinesData.length != timeLinesHtml.length) {
            console.log("Some timeline data could not be loaded or is missing.");
        };

        for (let index = 0; index < timeLinesHtml.length; index++) {
            let timeLineFrames = [];

            for (let index0 = 0; index0 < timeLinesData[index].details.length; index0++) {
                timeLineFrames.push(new TimeLineFrame(
                    timeLinesData[index].details[index0].header,
                    timeLinesData[index].details[index0].image,
                    timeLinesData[index].details[index0].name,
                    timeLinesData[index].details[index0].place,
                    timeLinesData[index].details[index0].text
                ));
            }

            timeLines.push(new TimeLine(timeLineFrames));
            timeLines[index].ToDOMElements().forEach(element => {
                timeLinesHtml[index].appendChild(element);
            });
        };
    });
}