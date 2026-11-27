import { Language } from "./enums.js";
import { DutchTranslations } from "./translation/dutchTranslationMap.js";
import { EnglishTranslations } from "./translation/englishTranslationMap.js";
import { FrenchTranslations } from "./translation/frenchTranslationmap.js";
import { GermanTranslations } from "./translation/germanTranslationMap.js";

class Translator {
  #translations = new Map();

  initialTranslate() {
    const language = localStorage.getItem("lang");

    if (!language || language === Language.English) return;

    if (!this.#translations.has(language)) this.loadTranslations(language);

    this.translateDocument(language);
  }

  translateWord(wordId, language) {
    if (!this.#translations.has(language)) this.loadTranslations(language);

    return this.#translations.get(language).get(wordId);
  }

  translateAllWords(wordIds, language) {
    let wordsTranslated = [];

    if (!this.#translations.has(language)) this.loadTranslations(language);

    wordIds.forEach((id) => {
      wordsTranslated.push(this.#translations.get(language).get(id));
    });

    return wordsTranslated;
  }

  translate(language) {
    let storedLanguage = localStorage.getItem("lang") ?? Language.English;

    if (language === storedLanguage) return;

    if (!this.#translations.has(language)) this.loadTranslations(language);

    localStorage.lang = language;

    this.translateDocument(language);

    document.documentElement.lang = language;
  }

  translateDocument(language) {
    let translatableElements = document.querySelectorAll("[data-translatable]");

    for (let i = 0; i < translatableElements.length; i++) {
      let translatableElement = translatableElements[i];
      translatableElement.innerHTML = this.#translations
        .get(language)
        .get(translatableElement.dataset.translatable);
    }
  }

  /**
   * Load translations for a specific language and sets active language.
   * @param {string} language Language to load translations for. Unknown will fall back to English.
   */
  loadTranslations(language) {
    switch (language) {
      case Language.English:
      default:
        this.#translations.set(Language.English, this.getEnglishTranslations());

        return;
      case Language.Dutch:
        this.#translations.set(Language.Dutch, this.getDutchTranslations());

        return;
      case Language.French:
        this.#translations.set(Language.French, this.getFrenchTranslations());

        return;
      case Language.German:
        this.#translations.set(Language.German, this.getGermanTranslations());

        return;
    }
  }

  getActiveLanguage() {
    return localStorage.getItem("lang") ?? Language.English;
  }

  getEnglishTranslations() {
    return EnglishTranslations;
  }

  getDutchTranslations() {
    return DutchTranslations;
  }

  getFrenchTranslations() {
    return FrenchTranslations
  }

  getGermanTranslations() {
    return GermanTranslations;
  }
}

export { Translator };
