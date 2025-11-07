class Configurator {
  #configurator;
  #languages;
  #isActive = false;
  #translator;

  constructor(configurator, activateOnClickElements, translator) {
    this.#configurator = configurator;
    this.#translator = translator;

    this.initialise();

    activateOnClickElements.forEach((element) => {
      element.addEventListener("click", () => {
        this.show();
      });
    });
  }

  initialise() {
    this.#languages = this.#configurator.querySelectorAll("[data-lang]");

    this.#languages.forEach((language) => {
      language.addEventListener("click", () => {});
    });
  }

  redraw() {
    let activeLang = this.#translator.getActiveLanguage();

    this.#languages.forEach((language) => {
      if (language.dataset.lang !== activeLang) return;

      let activeBanner = language.children[language.children.length - 1];
      let checkMark = activeBanner.children[0];

      activeBanner.classList.add("bg-green-300", "dark:bg-green-700");
      checkMark.classList.replace("filter-success", "filter-background");
    });
  }

  changeLanguageActive(language) {
    let activeBanner = language.children[language.children.length - 1];
    let checkMark = activeBanner.children[0];

    activeBanner.classList.add("bg-green-300", "dark:bg-green-700");
    checkMark.classList.replace("filter-success", "filter-background");
  }

  changeLanguageInactive(language) {
    let activeBanner = language.children[language.children.length - 1];
    let checkMark = activeBanner.children[0];

    activeBanner.classList = [];
    checkMark.classList.replace("filter-background", "filter-success");
  }

  show() {
    if (this.#isActive) return;

    this.redraw();
    this.#configurator.classList.remove("invisible");

    this.#isActive = true;
  }

  close() {
    this.#configurator.classList.add("invisible");

    this.#isActive = false;
  }
}

export { Configurator };
