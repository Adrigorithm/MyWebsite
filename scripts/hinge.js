class Hinge {
  #hingeContainer = undefined;
  #hingeContents = [];
  #navigationBar = undefined;
  #activeWhatButton = null;

  #activeContentId = 0;
  #dateData = {
    What: null,
    Where: null,
    When: null
  };
  #code = undefined;

  constructor(hingeContainer) {
    this.#hingeContainer = hingeContainer;
    this.#navigationBar = this.getLastChild(hingeContainer).children[1];
    this.#code = document.getElementById("code");

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

  getDateDataErrors() {
    let errors = [];

    if (!this.#dateData.What.event)
      errors.push(this.generateErrorElement("missingDateEvent", "- You should pick something in \"What?\" section. Pick the last one if you prefer to be surprised :3."));

    if (!this.#dateData.When.date || new Date() >= new Date(this.#dateData.When.date))
      errors.push(this.generateErrorElement("invalidDateDate", "- Time traveling is not my strong suit unfortunately."));

    if (!this.#dateData.Where.location?.trim())
      errors.push(this.generateErrorElement("missingDateLocation", "- The nothingness? I do not know where that is. Pick a place in the observable universe :3."));

    return errors;
  }

  generateErrorElement(translationKey, defaultText) {
    let span = document.createElement("span");
    span.dataset.translatable = translationKey;
    span.style.color = "red";

    let spanText = document.createTextNode(defaultText);
    span.appendChild(spanText);

    return span;
  }

  setDateData() {
    this.#dateData.What = {
      event: this.#activeWhatButton?.dataset?.event,
      message: document.getElementById("note-what").value
    }
    this.#dateData.Where = {
      location: document.getElementById("where").value,
      message: document.getElementById("note-where").value
    }
    this.#dateData.When = {
      date: document.getElementById("date-when").value,
      time: document.getElementById("time-when").value,
      message: document.getElementById("note-when").value
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

  generateCode() {
    this.setDateData();
    this.#code.replaceChildren();

    let errors = this.getDateDataErrors();


    if (errors.length === 0)
      this.#code.textContent = btoa(JSON.stringify(this.#dateData));
    else
      this.#code.append(... errors);
  }

  navigate(toId) {
    if (this.#activeContentId === toId)
      return;

    if (toId === this.#hingeContents.length - 1)
      this.generateCode();

    this.#hingeContents[this.#activeContentId].classList.add("hidden");
    this.#hingeContents[toId].classList.remove("hidden");
    this.#navigationBar.children[this.#activeContentId].classList.remove("text-3xl");
    this.#navigationBar.children[toId].classList.add("text-3xl");

    this.#activeContentId = toId;
  }
}

export { Hinge };
