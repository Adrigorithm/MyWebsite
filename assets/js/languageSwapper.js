"use strict"

import { Language } from "./enums.js"

class LanguageSwapper {
    currentLanguage = localStorage.getItem("lang") ?? Language.NONE;

    constructor(swapper){
        swapper.childNodes.forEach(element => {
            element.addEventListener("click", (e) => {
                console.log(element, e);
                let lang = e.target.alt;

                if (this.ShouldUpdateLanguage(lang))
                    this.UpdateLanguage(lang);
            });
        });
    }

    ShouldUpdateLanguage(lang) {
        return this.currentLanguage != lang;
    }

    UpdateLanguage(lang) {
        localStorage.setItem("lang", lang);

        switch (lang) {
            case Language.DUTCH:
                location.assign("/nl_be/index.html");
                break;
            case Language.CATALAN:
                location.assign("/cat/index.html");
                break;
            default:
                location.assign("/index.html");
                break;
        }
    }
}

export { LanguageSwapper }