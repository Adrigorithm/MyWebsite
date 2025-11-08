class Configurator {
  #configurator;
  #languages;
  #originalLanguage; // Language code: "gb" || "nl" || ...
  #selectionLanguage; // Lanuguage setting <div>
  #themes;
  #originalTheme; // Theme string: "dark" || "light" || ...
  #selectionTheme; // Theme setting <div>
  #isActive = false;
  #translator;
  #applyButton;
  #applyChangesButton;

  constructor(configurator, activateOnClickElements, translator) {
    this.#configurator = configurator;
    this.#translator = translator;

    this.initialise();

    for (const element of activateOnClickElements) {
      element.addEventListener("click", () => {
        this.show();
      });
    }
  }

  initialise() {
    this.#languages = this.#configurator.querySelectorAll("[data-lang]");
    this.#themes = this.#configurator.querySelectorAll("[data-theme]");
    this.#applyButton = this.#configurator.querySelector("#apply");
    this.#applyChangesButton =
      this.#configurator.querySelector("#applyChanges");
    let closeButtons = this.#configurator.getElementsByClassName("closeConfig");

    for (const button of closeButtons) {
      button.addEventListener("click", () => {
        this.close();
      });
    }
  }

  redraw() {
    this.#originalLanguage = this.#translator.getActiveLanguage();
    this.#originalTheme = localStorage.getItem("theme");

    this.#languages.forEach((language) => {
      language.addEventListener("click", () => {
        this.setActiveLangBanner(
          language,
          this.getBannerFromSectionDiv(language),
        );
      });

      if (language.dataset.lang !== this.#originalLanguage) return;

      let activeLangBanner = this.getBannerFromSectionDiv(language);

      activeLangBanner.classList.remove("invisible");
    });

    this.#themes.forEach((theme) => {
      theme.addEventListener("click", () => {
        this.setActiveThemeBanner(theme, this.getBannerFromSectionDiv(theme));
      });

      if (theme.dataset.theme !== this.#originalTheme) return;

      let activeThemeBanner = this.getBannerFromSectionDiv(theme);

      activeThemeBanner.classList.remove("invisible");
    });
  }

  getBannerFromLanguage(lang) {
    for (const langDiv of this.#languages) {
      if (langDiv.dataset.lang === lang)
        return this.getBannerFromSectionDiv(langDiv);
    }
  }

  getBannerFromTheme(theme) {
    for (const themeDiv of this.#themes) {
      if (themeDiv.dataset.theme === theme)
        return this.getBannerFromSectionDiv(themeDiv);
    }
  }

  getBannerFromSectionDiv(div) {
    return div.children[div.children.length - 1];
  }

  setActiveThemeBanner(theme, banner) {
    if (this.#selectionTheme) {
      if (this.#selectionTheme === theme) return;

      let activeBanner = this.getBannerFromSectionDiv(this.#selectionTheme);

      if (this.#selectionTheme.dataset.theme === this.#originalTheme) {
        activeBanner.classList.replace("bg-green-300", "bg-yellow-300");
        activeBanner.classList.replace(
          "dark:bg-green-700",
          "dark:bg-yellow-700",
        );
      } else {
        activeBanner.classList.add("invisible");
      }

      if (theme.dataset.theme === this.#originalTheme) {
        activeBanner.classList.replace("bg-yellow-300", "bg-green-300");
        activeBanner.classList.replace(
          "dark:bg-yellow-700",
          "dark:bg-green-700",
        );
      } else {
        banner.classList.remove("invisible");
      }

      this.#applyButton.classList.add("hidden");
      this.#applyChangesButton.classList.remove("hidden");

      this.#selectionTheme = theme;

      return;
    }

    if (this.#originalTheme === theme.dataset.theme) return;

    let activeBanner = this.getBannerFromTheme(this.#originalTheme);
    this.#selectionTheme = theme;

    activeBanner.classList.replace("bg-green-300", "bg-yellow-300");
    activeBanner.classList.replace("dark:bg-green-700", "dark:bg-yellow-700");
    banner.classList.remove("invisible");
    this.#applyButton.classList.add("hidden");
    this.#applyChangesButton.classList.remove("hidden");
  }

  setActiveLangBanner(lang, banner) {
    if (this.#selectionLanguage) {
      if (this.#selectionLanguage === lang) return;

      let activeBanner = this.getBannerFromSectionDiv(this.#selectionLanguage);

      if (this.#selectionLanguage.dataset.lang === this.#originalLanguage) {
        activeBanner.classList.replace("bg-green-300", "bg-yellow-300");
        activeBanner.classList.replace(
          "dark:bg-green-700",
          "dark:bg-yellow-700",
        );
      } else {
        activeBanner.classList.add("invisible");
      }

      if (lang.dataset.lang === this.#originalLanguage) {
        activeBanner.classList.replace("bg-yellow-300", "bg-green-300");
        activeBanner.classList.replace(
          "dark:bg-yellow-700",
          "dark:bg-green-700",
        );
      } else {
        banner.classList.remove("invisible");
      }

      this.#applyButton.classList.add("hidden");
      this.#applyChangesButton.classList.remove("hidden");

      this.#selectionLanguage = lang;

      return;
    }

    if (this.#originalLanguage === lang.dataset.lang) return;

    let activeBanner = this.getBannerFromLanguage(this.#originalLanguage);
    this.#selectionLanguage = lang;

    activeBanner.classList.replace("bg-green-300", "bg-yellow-300");
    activeBanner.classList.replace("dark:bg-green-700", "dark:bg-yellow-700");
    banner.classList.remove("invisible");
    this.#applyButton.classList.add("hidden");
    this.#applyChangesButton.classList.remove("hidden");
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

  getActiveLanguageSvg(langCode) {
    for (const language of this.#languages) {
      if (language.dataset.lang === langCode) {
        let svg = language.getElementsByTagName("svg")[0];

        return svg;
      }
    }
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
