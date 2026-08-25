class Hinge {
  #hingeContainer = undefined;
  #hingeContents = [];
  #navigationBar = undefined;
  #activeWhatButton = null;
  #summaryWhat = undefined;
  #summaryWhere = undefined;
  #summaryWhen = undefined;

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

    if (!this.#dateData.What.event) {
      errors.push(this.generateErrorElement("missingDateEvent", "Pick the last \"What\" if you prefer to be surprised :3."));
      this.#dateData.What.event = "<empty>";
    }

    if (!this.#dateData.When.date) {
      errors.push(this.generateErrorElement("missingDateDate", "I have yet to master telepathy, in the meantime, set a date :3"));
      this.#dateData.When.date = "<empty>";
    } else {
      let parsedDate = new Date(this.#dateData.When.date);
      this.#dateData.When.date = parsedDate.toLocaleDateString();

      if (new Date() >= parsedDate)
        errors.push(this.generateErrorElement("invalidDateDate", "Time traveling is not my strong suit unfortunately."));
    }

    if (!this.#dateData.Where.location?.trim()) {
      errors.push(this.generateErrorElement("missingDateLocation", "The nothingness? Pick a place in the observable universe :3."));
      this.#dateData.Where.location = "<empty>";
    }

    if (!this.#dateData.What.message.trim())
      this.#dateData.What.message = "<empty>";

    if (!this.#dateData.Where.message.trim())
      this.#dateData.Where.message = "<empty>";

    if (!this.#dateData.When.message.trim())
      this.#dateData.When.message = "<empty>";

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

  getErrorBorder() {
    let border = document.createElement("hr");
    border.classList = ["dark:border-gray-300 border-gray-800"];

    return border;
  }

  setupSummary() {
    this.setDateData();

    this.#code.replaceChildren();

    let errors = this.validateAndAdjustDateData();

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
      this.generateCode();
    }

    this.fillSummary();
  }

  fillSummary() {
    this.#summaryWhat.children[0].textContent = this.#dateData.What.event;
    this.#summaryWhat.children[1].textContent = this.#dateData.What.message;

    this.#summaryWhere.children[0].textContent = this.#dateData.Where.location;
    this.#summaryWhere.children[1].textContent = this.#dateData.Where.message;

    this.#summaryWhen.children[0].textContent = this.#dateData.When.date;
    this.#summaryWhen.children[1].textContent = this.#dateData.When.time;
    this.#summaryWhen.children[2].textContent = this.#dateData.When.message;
  }

  generateCode() {
    this.#code.textContent = btoa(JSON.stringify(this.#dateData));
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
