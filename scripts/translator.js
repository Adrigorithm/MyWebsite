import { Language } from "./enums";

class Translator {
  #language_active = "en";
  #translations = new Map();

  translate(language) {
    if (language == this.#language_active) return;

    if (!this.#translations.has(language)) this.loadTranslations(language);

    this.#language_active = language;
  }

  getTranslations(language) {
    return this.#translations.get(language);
  }

  /**
   * Load translations for a specific language.
   * English should always be loaded.
   * @param {string} language Language to load translations for. English or unknown will be ignored.
   */
  loadTranslations(language) {
    switch (language) {
      case Language.Dutch:
        this.#translations.set(Language.Dutch, []);
        break;
      case Language.French:
        this.#translations.set(Language.French, []);
        break;
      case Language.German:
        this.#translations.set(Language.German, []);
        break;
      case Language.Polish:
        this.#translations.set(Language.Polish, []);
        break;
      case Language.Catalan:
        this.#translations.set(Language.Catalan, []);
        break;
      case Language.Chinese:
        this.#translations.set(Language.Chinese, []);
        break;
      case Language.Japanese:
        this.#translations.set(Language.Japanese, []);
        break;
      case Language.Norwegian:
        this.#translations.set(Language.Norwegian, []);
        break;
    }
  }
}
