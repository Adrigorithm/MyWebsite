import { Language } from "./enums";

class Translator {
  #language_active = "en";
  #translations = new Map();

  translate(language) {
    if (language == this.#language_active) return;

    if (!this.#translations.has(language)) this.loadTranslations(language);

    this.translateDocument();
  }

  translateDocument() {
    let translatableElements = document.getElementsByClassName("translatable");

    for (let i = 0; i < translatableElements.length; i++) {
      let translatableElement = translatableElements[i];
      translatableElement.textContent = this.#translations.get(
        this.#language_active,
      )[i];
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
        this.#language_active = Language.English;

        return;
      case Language.Dutch:
        this.#translations.set(Language.Dutch, this.getDutchTranslations());
        this.#language_active = Language.Dutch;

        return;
      case Language.French:
        this.#translations.set(Language.French, this.getFrenchTranslations());
        this.#language_active = Language.French;

        return;
      case Language.German:
        this.#translations.set(Language.German, this.getGermanTranslations());
        this.#language_active = Language.German;

        return;
      case Language.Polish:
        this.#translations.set(Language.Polish, this.getPolishTranslations());
        this.#language_active = Language.Polish;

        return;
      case Language.Catalan:
        this.#translations.set(Language.Catalan, this.getCatalanTranslations());
        this.#language_active = Language.Catalan;

        return;
      case Language.Chinese:
        this.#translations.set(Language.Chinese, this.getChineseTranslations());
        this.#language_active = Language.Chinese;

        return;
      case Language.Japanese:
        this.#translations.set(
          Language.Japanese,
          this.getJapaneseranslations(),
        );
        this.#language_active = Language.Japanese;

        return;
      case Language.Norwegian:
        this.#translations.set(
          Language.Norwegian,
          this.getNorwegianTranslations(),
        );
        this.#language_active = Language.Norwegian;

        return;
    }
  }

  getActiveLanguage() {
    return this.#language_active;
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
