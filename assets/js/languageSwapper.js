"use strict"

import { Language } from "./enums"

class LanguageSwapper {
    currentLanguage = localStorage.getItem("lang") ?? Language.NONE;

    constructor(swapper){
        swapper.children.forEach(element => {
            element.addEventListener("click", (e) => {
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
        switch (lang) {
            case "Dutch":
                this.currentLanguage = Language.DUTCH;
                break;
            case "Catalan":
                this.currentLanguage = Language.CATALAN;
            default:
                this.currentLanguage = Language.ENGLISH;
        }
    }
}

export { LanguageSwapper }