import { LogLevel } from "./enums.js";

class Hinge {
  #hingeContainer = undefined;
  #hingeContents = [];
  #navigationBar = undefined;
  #activeWhatButton = null;
  #summaryWhat = undefined;
  #summaryWhere = undefined;
  #summaryWhen = undefined;
  #translationService = null;
  #toastSpawner = null;

  #activeContentId = 0;
  #dateData = {
    What: null,
    Where: null,
    When: null
  };
  #code = undefined;

  constructor(hingeContainer, translationService, toastSpawner) {
    this.#translationService = translationService;
    this.#toastSpawner = toastSpawner;
    this.#hingeContainer = hingeContainer;
    this.#navigationBar = this.getLastChild(hingeContainer).children[1];
    this.#code = document.getElementById("code");
    this.#summaryWhat = document.getElementById("summary-what");
    this.#summaryWhere = document.getElementById("summary-where");
    this.#summaryWhen = document.getElementById("summary-when");

    let counter = 0;

    for (const element of this.#hingeContainer.children) {
      if (counter === this.#hingeContainer.children.length - 1)
        break;

      this.#hingeContents.push(element);
      counter++;
    }

    this.setupContents();
    this.setupPreviousButton();
    this.setupNextButton();
    this.setupNavigationBar();
  }

  getLastChild(element) {
    return element.children[element.children.length - 1];
  }

  getFirstChild(element) {
    return element.children[0];
  }

  setupContents() {
    for (const button of this.#hingeContents[0].getElementsByTagName("button")) {
      button.addEventListener("click", () => {
        if (this.#activeWhatButton)
          this.getLastChild(this.#activeWhatButton).classList = ["invisible"];

        this.getLastChild(button).classList = ["bg-green-300 dark:bg-green-700"];
        this.#activeWhatButton = button;
      });
    }
  }

  validateAndAdjustDateData() {
    let errors = [];

    if (this.#dateData.What.event === "&nbsp;") {
      errors.push(this.generateErrorElement("missingDateEvent"));
    }

    if (this.#dateData.When.date === "&nbsp;") {
      errors.push(this.generateErrorElement("missingDateDate"));
    } else {
      let parsedDate = new Date(this.#dateData.When.date);
      this.#dateData.When.date = parsedDate.toLocaleDateString();

      if (new Date() >= parsedDate)
        errors.push(this.generateErrorElement("invalidDateDate"));
    }

    if (this.#dateData.Where.location === "&nbsp;") {
      errors.push(this.generateErrorElement("missingDateLocation"));
    }

    return errors;
  }

  generateErrorElement(translationKey) {
    let span = document.createElement("span");
    span.dataset.translatable = translationKey;
    span.style.color = "red";

    let string = this.#translationService.translateWord(
      translationKey,
      this.#translationService.getActiveLanguage(),
    );

    let spanText = document.createTextNode(string);
    span.appendChild(spanText);

    return span;
  }

  setDateData() {
    this.#dateData.What = {
      event: this.#activeWhatButton?.dataset?.event || "&nbsp;",
      message: document.getElementById("note-what").value.trim() || "&nbsp;"
    }
    this.#dateData.Where = {
      location: document.getElementById("where").value.trim() || "&nbsp;",
      message: document.getElementById("note-where").value.trim() || "&nbsp;"
    }
    this.#dateData.When = {
      date: document.getElementById("date-when").value || "&nbsp;",
      time: document.getElementById("time-when").value,
      message: document.getElementById("note-when").value.trim() || "&nbsp;"
    }
  }

  setupPreviousButton() {
    this.getFirstChild(this.getLastChild(this.#hingeContainer)).addEventListener("click", () => {
      if (this.#activeContentId === 0)
        return;

      this.navigate(this.#activeContentId - 1);
    });
  }

  setupNextButton() {
    this.getLastChild(this.getLastChild(this.#hingeContainer)).addEventListener("click", () => {
      if (this.#activeContentId === this.#hingeContents.length - 1)
        return;

      this.navigate(this.#activeContentId + 1);
    });
  }

  getNavigationButtonId(button) {
    let counter = 0;

    for (const innerButton of this.#navigationBar.children) {
      if (button === innerButton)
        return counter;

      counter++;
    }
  }

  setupNavigationBar() {
    for (const button of this.#navigationBar.children) {
      button.addEventListener("click", () => {
        this.navigate(this.getNavigationButtonId(button));
      });
    }
  }

  getErrorBorder() {
    let border = document.createElement("hr");
    border.classList = ["dark:border-gray-300 border-gray-800"];

    return border;
  }

  setupSummary() {
    this.setDateData();

    this.#code.replaceChildren();

    let errors = this.validateAndAdjustDateData();
    let success = false;

    if (errors.length !== 0) {
      let counter = 0;

      for (const error of errors) {
        this.#code.appendChild(error);

        if (counter < errors.length - 1)
          this.#code.appendChild(this.getErrorBorder());

        counter++;
      }
    }
    else {
      success = true;
      this.generateCode();
    }

    this.fillSummary();

    if (success)
      this.#toastSpawner.spawn("hingeDateSuccess", LogLevel.Success);
    else
      this.#toastSpawner.spawn("hingeDateFailure", LogLevel.Failure);
  }

  fillSummary() {
    this.#summaryWhat.replaceChildren();
    this.#summaryWhere.replaceChildren();
    this.#summaryWhen.replaceChildren();

    this.#summaryWhat.append(this.generateDateDataElement(this.#dateData.What.event), this.generateP(this.#dateData.What.message));
    this.#summaryWhere.append(this.generateP(this.#dateData.Where.location), this.generateP(this.#dateData.Where.message));
    this.#summaryWhen.append(this.generateP(this.#dateData.When.date), this.generateDateDataElement(this.#dateData.When.time), this.generateP(this.#dateData.When.message));
  }

  generateCode() {
    this.#code.textContent = btoa(JSON.stringify(this.#dateData));
  }

  generateP(text) {
    let p = document.createElement("p");
    p.innerHTML = text;

    return p;
  }

  generateDateDataElement(key) {
    let element = document.createElement("p");
    element.dataset.translatable = key

    let string = this.#translationService.translateWord(
      key,
      this.#translationService.getActiveLanguage(),
    );

    element.innerHTML = string ?? "&nbsp;";

    return element;
  }

  navigate(toId) {
    if (this.#activeContentId === toId)
      return;

    if (toId === this.#hingeContents.length - 1)
      this.setupSummary();

    this.#hingeContents[this.#activeContentId].classList.add("hidden");
    this.#hingeContents[toId].classList.remove("hidden");
    this.#navigationBar.children[this.#activeContentId].classList.remove("text-3xl");
    this.#navigationBar.children[toId].classList.add("text-3xl");

    this.#activeContentId = toId;
  }
}

export { Hinge };
