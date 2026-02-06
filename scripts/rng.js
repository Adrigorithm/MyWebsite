class Rng {
  #lowerBound = undefined;
  #lowerBoundValue = 0;
  #upperBound = undefined;
  #upperBoundValue = 0;
  #errorOutput = undefined;
  #generatedNumberField = undefined;
  #errors = [];

  constructor(
    lowerBound,
    upperBound,
    generateButton,
    errorOutput,
    generatedNumberField,
  ) {
    this.#lowerBound = lowerBound;
    this.#upperBound = upperBound;
    this.#errorOutput = errorOutput;
    this.#generatedNumberField = generatedNumberField;

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
      this.addError("Lower number must be smaller than upper number");

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
        `Lower value must be a number bigger or equal to <b>${Number.MIN_SAFE_INTEGER}</b>`,
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
        `Upper value must be a number smaller or equal to <b>${Number.MAX_SAFE_INTEGER}</b>`,
      );

      return false;
    }

    return true;
  }

  addError(error) {
    let p = document.createElement("p");
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
