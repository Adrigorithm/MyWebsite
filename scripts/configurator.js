import { Language, LogLevel } from "./enums.js";

class Configurator {
  #configurator; // The entire config window
  #languages; // List of all language settings <div>s
  #originalLanguageCode; // "en-GB", "nl-BE", ...
  #originalLanguage; // Language setting <div>
  #selectionLanguage; // Language setting <div>
  #themes; // List of all theme settings <div>s
  #originalThemeCode; // "dark", "light"
  #originalTheme; // Theme setting <div>
  #selectionTheme; // Theme setting <div>
  #isActive = false; // Window visibility
  #translator; // Translator object
  #applyButton; // Button to change settings (does nothing)
  #applyChangesButton; // Button to change changed settings
  #activeLanguagebutton; // Button to display current display language
  #toastSpawner; // Used to spawn 'saved' messages
  #overlay;

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
    this.#activeLanguagebutton = document.getElementById("activeLanguage");
    this.#overlay = document.getElementById("overlay");
    let closeButtons = this.#configurator.getElementsByClassName("closeConfig");
    let defaultsButton = this.#configurator.querySelector("#defaults");

    for (const button of closeButtons) {
      button.addEventListener("click", () => {
        this.close();
      });
    }

    this.#applyChangesButton.addEventListener("click", (e) => {
      this.saveSettings(
        this.#selectionLanguage?.dataset.lang ?? this.#originalLanguageCode,
        this.#selectionTheme?.dataset.theme ?? this.#originalThemeCode,
      );

      this.resetApplyButtons();
      this.render();
      this.#toastSpawner.spawn("Settings updated!", LogLevel.Success);
    });

    defaultsButton.addEventListener("click", () => {
      this.saveSettings(Language.English, null);
      this.resetApplyButtons();
      this.render();
      this.#toastSpawner.spawn("Reverted setting changes!", LogLevel.Success);
    });
  }

  saveSettings(lang, theme) {
    this.#translator.translate(lang);

    if (theme) {
      localStorage.setItem("theme", theme);
      document.documentElement.classList = [theme];
    } else {
      localStorage.removeItem("theme");
      document.documentElement.classList = [
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light",
      ];
    }

    this.updateActiveLanguageButton();
  }

  resetApplyButtons() {
    this.#applyChangesButton.classList.add("hidden");
    this.#applyButton.classList.remove("hidden");
  }

  render() {
    this.#originalLanguageCode = this.#translator.getActiveLanguage();
    this.#originalThemeCode = localStorage.getItem("theme");

    if (!this.#originalThemeCode)
      this.#originalThemeCode = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches
        ? "dark"
        : "light";

    this.#languages.forEach((language) => {
      language.addEventListener("click", () => {
        this.activateLanguage(language);
        this.refreshApplyButtons();
      });

      let banner = this.getBannerFromSectionDiv(language);
      banner.classList = ["bg-green-300 dark:bg-green-700"];

      if (language.dataset.lang !== this.#originalLanguageCode)
        this.getBannerFromSectionDiv(language).classList.add("invisible");
      else this.#originalLanguage = language;
    });

    this.#themes.forEach((theme) => {
      theme.addEventListener("click", () => {
        this.activateTheme(theme);
        this.refreshApplyButtons();
      });

      let banner = this.getBannerFromSectionDiv(theme);
      banner.classList = ["bg-green-300 dark:bg-green-700"];

      if (theme.dataset.theme !== this.#originalThemeCode)
        this.getBannerFromSectionDiv(theme).classList.add("invisible");
      else this.#originalTheme = theme;
    });

    this.resetApplyButtons();
  }

  activateLanguage(language) {
    if (this.#selectionLanguage)
      this.getBannerFromSectionDiv(this.#selectionLanguage).classList.add(
        "invisible",
      );

    let banner = this.getBannerFromSectionDiv(language);
    let originalBanner = this.getBannerFromSectionDiv(this.#originalLanguage);

    if (language != this.#originalLanguage)
      originalBanner.classList = ["bg-yellow-300 dark:bg-yellow-700"];

    banner.classList = ["bg-green-300 dark:bg-green-700"];
    this.#selectionLanguage = language;
  }

  activateTheme(theme) {
    if (this.#selectionTheme)
      this.getBannerFromSectionDiv(this.#selectionTheme).classList.add(
        "invisible",
      );

    let banner = this.getBannerFromSectionDiv(theme);
    let originalBanner = this.getBannerFromSectionDiv(this.#originalTheme);

    if (theme != this.#originalTheme)
      originalBanner.classList = ["bg-yellow-300 dark:bg-yellow-700"];

    banner.classList = ["bg-green-300 dark:bg-green-700"];
    this.#selectionTheme = theme;
  }

  refreshApplyButtons() {
    if (this.areChangesPending()) {
      this.#applyButton.classList.add("hidden");
      this.#applyChangesButton.classList.remove("hidden");
    } else {
      this.#applyButton.classList.remove("hidden");
      this.#applyChangesButton.classList.add("hidden");
    }
  }

  getBannerFromSectionDiv(div) {
    return div.children[div.children.length - 1];
  }

  areChangesPending() {
    return (
      (this.#selectionLanguage &&
        this.#selectionLanguage.dataset.lang !== this.#originalLanguageCode) ||
      (this.#selectionTheme &&
        this.#selectionTheme.dataset.theme !== this.#originalThemeCode)
    );
  }

  updateActiveLanguageButton() {
    let langCode = this.#translator.getActiveLanguage();

    for (const language of this.#languages) {
      if (language.dataset.lang === langCode) {
        let flag = language.getElementsByTagName("svg")[0];
        let flagCopy = flag.cloneNode(true);
        this.#activeLanguagebutton.textContent = "";

        flagCopy.classList.replace("h-16", "h-4");
        this.#activeLanguagebutton.appendChild(flagCopy);
        void this.#activeLanguagebutton.offsetWidth;
      }
    }
  }

  setToastSpawner(toastSpawner) {
    this.#toastSpawner = toastSpawner;
  }

  setActiveLanguageButton(button) {
    this.#activeLanguagebutton = button;
  }

  show() {
    if (this.#isActive) return;

    this.#overlay.classList.replace("hidden", "flex");
    this.render();
    this.#configurator.classList.remove("hidden");

    this.#isActive = true;
  }

  close() {
    this.#configurator.classList.add("hidden");
    this.#overlay.classList.replace("flex", "hidden");

    this.#isActive = false;
  }
}

export { Configurator };
