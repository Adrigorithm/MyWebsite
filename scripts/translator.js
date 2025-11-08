import { Language } from "./enums.js";

class Translator {
  #translations = new Map();

  translate(language) {
    let storedLanguage = localStorage.getItem("lang") ?? Language.English;

    if (language === storedLanguage) return;

    if (!this.#translations.has(language)) this.loadTranslations(language);

    this.translateDocument(language);
  }

  translateDocument(language) {
    let translatableElements = document.getElementsByClassName("translatable");

    for (let i = 0; i < translatableElements.length; i++) {
      let translatableElement = translatableElements[i];
      translatableElement.textContent = this.#translations.get(language)[i];
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
        localStorage.lang = Language.English;

        return;
      case Language.Dutch:
        this.#translations.set(Language.Dutch, this.getDutchTranslations());
        localStorage.lang = Language.Dutch;

        return;
      case Language.French:
        this.#translations.set(Language.French, this.getFrenchTranslations());
        localStorage.lang = Language.French;

        return;
      case Language.German:
        this.#translations.set(Language.German, this.getGermanTranslations());
        localStorage.lang = Language.German;

        return;
      case Language.Polish:
        this.#translations.set(Language.Polish, this.getPolishTranslations());
        localStorage.lang = Language.Polish;

        return;
      case Language.Catalan:
        this.#translations.set(Language.Catalan, this.getCatalanTranslations());
        localStorage.lang = Language.Catalan;

        return;
      case Language.Chinese:
        this.#translations.set(Language.Chinese, this.getChineseTranslations());
        localStorage.lang = Language.Chinese;

        return;
      case Language.Japanese:
        this.#translations.set(
          Language.Japanese,
          this.getJapaneseranslations(),
        );
        localStorage.lang = Language.Japanese;

        return;
      case Language.Norwegian:
        this.#translations.set(
          Language.Norwegian,
          this.getNorwegianTranslations(),
        );
        localStorage.lang = Language.Norwegian;

        return;
    }
  }

  getActiveLanguage() {
    return localStorage.getItem("lang") ?? Language.English;
  }

  getEnglishTranslations() {
    return ["Hi"];
  }

  getDutchTranslations() {
    return ["Hi"];
  }

  getFrenchTranslations() {
    return ["Hi"];
  }

  getGermanTranslations() {
    return ["Hi"];
  }

  getPolishTranslations() {
    return ["Hi"];
  }

  getCatalanTranslations() {
    return ["Hi"];
  }

  getChineseTranslations() {
    return ["Hi"];
  }

  getJapaneseranslations() {
    return ["Hi"];
  }

  getNorwegianTranslations() {
    return ["Hi"];
  }
}

export { Translator };
