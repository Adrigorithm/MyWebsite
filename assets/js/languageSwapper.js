"use strict"

import { Language } from "./enums.js"

class LanguageSwapper {
    currentLanguage = localStorage.getItem("lang") ?? Language.NONE;
    #url = location.pathname;

    constructor(){

    }

    SetupLangSwapper(swapper){
        swapper.childNodes.forEach(element => {
            element.addEventListener("click", (e) => {
                e.preventDefault();
                
                let lang = e.target.alt;

                if (this.IsLanguageChanged(lang))
                    this.UpdateLanguage(lang);
            });
        });
    }

    Navigate(){
        let lastSlashIndex = this.#url.indexOf('/', 4);
        let lang = lastSlashIndex == -1
            ? Language.NONE
            : this.#url.slice(1, lastSlashIndex);

        if (this.IsLanguageChanged(lang))
            this.UpdateLanguage(this.currentLanguage, false);
    }

    IsLanguageChanged(lang) {
        return this.currentLanguage != lang;
    }

    UpdateLanguage(lang, setLocalStorage = true) {
        if (setLocalStorage)
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