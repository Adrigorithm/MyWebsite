class Hinge {
  #hingeContainer = undefined;
  #hingeContents = [];
  #navigationBar = undefined;

  #activeContentId = 0;

  constructor(hingeContainer) {
    this.#hingeContainer = hingeContainer;
    this.#navigationBar = this.getLastChild(hingeContainer).children[1];

    let counter = 0;

    for (const element of this.#hingeContainer.children) {
      if (counter === this.#hingeContainer.children.length - 1)
        break;

      this.#hingeContents.push(element);
      counter++;
    }

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

  navigate(toId) {
    if (this.#activeContentId === toId)
      return;

    this.#hingeContents[this.#activeContentId].classList.add("hidden");
    this.#hingeContents[toId].classList.remove("hidden");
    this.#navigationBar.children[this.#activeContentId].classList.remove("text-3xl");
    this.#navigationBar.children[toId].classList.add("text-3xl");

    this.#activeContentId = toId;
  }
}

export { Hinge };
