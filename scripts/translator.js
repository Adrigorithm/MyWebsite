import { Language } from "./enums.js";

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

    return this.#translations[language][wordId];
  }

  translateAllWords(wordIds, language) {
    wordsTranslated = [];

    if (!this.#translations.has(language)) this.loadTranslations(language);

    wordIds.forEach((id) => {
      wordsTranslated.push(this.#translations[language][id]);
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
      case Language.Polish:
        this.#translations.set(Language.Polish, this.getPolishTranslations());

        return;
      case Language.Catalan:
        this.#translations.set(Language.Catalan, this.getCatalanTranslations());

        return;
      case Language.Chinese:
        this.#translations.set(Language.Chinese, this.getChineseTranslations());

        return;
      case Language.Japanese:
        this.#translations.set(
          Language.Japanese,
          this.getJapaneseranslations(),
        );

        return;
      case Language.Norwegian:
        this.#translations.set(
          Language.Norwegian,
          this.getNorwegianTranslations(),
        );

        return;
    }
  }

  getActiveLanguage() {
    return localStorage.getItem("lang") ?? Language.English;
  }

  getEnglishTranslations() {
    return new Map()
      .set("tab", "Adri's cat tree")
      .set("about", "About")
      .set("projects", "Projects")
      .set("configurator", "Configurator")
      .set("theme", "Theme")
      .set("language", "Language")
      .set("hi", "Hi :3")
      .set("iAmA", "I am a")
      .set("yearOldDutch", "-year-old Dutch")
      .set("softwareEngineer", "Software Engineer")
      .set("catCuddler", "Cat Cuddler")
      .set("cloudEngineer", "Cloud Engineer")
      .set("pentester", "Pentester")
      .set("belgiumCats", " from Belgium. I like cats.")
      .set()
      .set()
      .set()
      .set()
      .set()
      .set()
      .set()
      .set()
      .set()
      .set()
      .set()
      .set()
      .set()
      .set()
      .set()
      .set()
      .set()
      .set()
      .set()
      .set()
      .set();
  }

  getDutchTranslations() {
    return new Map()
      .set("tab", "Adri's kattenboom")
      .set("about", "Over")
      .set("projects", "Projecten");
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
