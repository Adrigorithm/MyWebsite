"use strict"

import { Language } from "./enums"

class LanguageSwapper {
    #swapper = undefined;
    #currentLanguage = Language.NONE;

    constructor(swapper){
        this.#swapper = swapper;
    }

    ShouldUpdateLanguage() {
        let oldLang = this.#currentLanguage;

        switch (this.#swapper.alt) {
            case "Dutch":
                this.#currentLanguage = Language.DUTCH;
                break;
            case "Catalan":
                this.#currentLanguage = Language.CATALAN;
            default:
                this.#currentLanguage = Language.ENGLISH;
        }

        return oldLang != this.#currentLanguage
    }
}

export { LanguageSwapper }