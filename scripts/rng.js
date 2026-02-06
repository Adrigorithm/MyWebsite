class Rng {
  #lowerBound = undefined;
  #lowerBoundValue = 0;
  #upperBound = undefined;
  #upperBoundValue = 0;
  #errorOutput = undefined;
  #generatedNumberField = undefined;
  #translator = null;
  #errors = [];

  constructor(
    lowerBound,
    upperBound,
    generateButton,
    errorOutput,
    generatedNumberField,
    translator,
  ) {
    this.#lowerBound = lowerBound;
    this.#upperBound = upperBound;
    this.#errorOutput = errorOutput;
    this.#generatedNumberField = generatedNumberField;
    this.#translator = translator;

    generateButton.addEventListener("click", () => {
      generateButton.disabled = true;
      this.#lowerBoundValue = this.#lowerBound.value;
      this.#upperBoundValue = this.#upperBound.value;
      this.#errorOutput.replaceChildren();
      this.#errors = [];
      this.generate();
      generateButton.disabled = false;
    });
  }

  generate() {
    if (!this.isValid()) {
      this.#generatedNumberField.innerHTML = ":3";
      this.setErrors();
    } else {
      this.#generatedNumberField.innerHTML = this.getRandomIntInclusive(
        this.#lowerBoundValue,
        this.#upperBoundValue,
      );
    }
  }

  isValid() {
    let lowerBoundValid = this.isLowerBoundValid();
    let upperBoundValid = this.isUpperBoundValid();

    if (!lowerBoundValid || !upperBoundValid) return false;

    return this.isGeneratable();
  }

  getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  isGeneratable() {
    if (this.#lowerBoundValue >= this.#upperBoundValue) {
      this.addError(
        "lower<Upper",
        this.#translator.translateWord(
          "lower<Upper",
          this.#translator.getActiveLanguage(),
        ),
      );

      return false;
    }

    return true;
  }

  isLowerBoundValid() {
    if (this.#lowerBoundValue.trim() == "") {
      this.#lowerBoundValue = 0;

      return true;
    }

    this.#lowerBoundValue = Number.parseInt(this.#lowerBoundValue);

    if (
      Number.isNaN(this.#lowerBoundValue) ||
      this.#lowerBoundValue < Number.MIN_SAFE_INTEGER
    ) {
      this.addError(
        "lower>Limit",
        this.#translator.translateWord(
          "lower>Limit",
          this.#translator.getActiveLanguage(),
        ),
      );

      return false;
    }

    return true;
  }

  isUpperBoundValid() {
    if (this.#upperBoundValue.trim() == "") {
      this.#upperBoundValue = 0;

      return true;
    }

    this.#upperBoundValue = Number.parseInt(this.#upperBoundValue);

    if (
      Number.isNaN(this.#upperBoundValue) ||
      this.#upperBoundValue > Number.MAX_SAFE_INTEGER
    ) {
      this.addError(
        "bigger<Limit",
        this.#translator.translateWord(
          "bigger<Limit",
          this.#translator.getActiveLanguage(),
        ),
      );

      return false;
    }

    return true;
  }

  addError(id, error) {
    let p = document.createElement("p");
    p.dataset.translatable = id;
    p.innerHTML = error;
    p.style.color = "red";

    this.#errors.push(p);
  }

  setErrors() {
    this.#errors.forEach((error) => {
      this.#errorOutput.appendChild(error);
    });
  }
}

export { Rng };
