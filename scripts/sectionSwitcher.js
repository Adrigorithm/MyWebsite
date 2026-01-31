class SectionSwitcher {
  #switcher = undefined;
  #buttons = undefined;
  #resetButtons = undefined;
  #sections = undefined;
  #busy = false;
  #sectionActive = -1;

  constructor(switcher, sections, resetButtons) {
    this.#switcher = switcher;
    this.#buttons = switcher.getElementsByTagName("button");
    this.#resetButtons = resetButtons;
    this.#sections = sections;

    this.setup();
  }

  setup() {
    for (const button of this.#buttons) {
      button.addEventListener("click", () => {
        if (this.#busy) return;

        this.switch(button);
      });
    }

    window.addEventListener("resize", () => {
      if (this.#sectionActive >= 0) return;

      this.centerSwitcher();
    });

    this.centerSwitcher();
  }

  getIndexOfHTMLCollection(element, collection) {
    let counter = 0;

    for (const element0 of collection) {
      if (element === element0) return counter;

      counter++;
    }

    return -1;
  }

  switch(button) {
    let activeSection = this.#sectionActive;

    void this.animate(false, button);

    if (this.#sectionActive > -1) {
      this.#buttons.item(activeSection).classList.remove("border-b-2");
      this.#sections.item(activeSection).classList.add("opacity-0", "hidden");
    }

    console.log(`After antimation method call: ${this.#sectionActive}`);

    this.#sections
      .item(this.#sectionActive)
      .classList.remove("opacity-0", "hidden");
    button.classList.add("border-b-2");
  }

  reset() {
    this.centerSwitcher();
  }

  calculateSwitcherMargin() {
    let parentHeight = this.#switcher.parentElement.clientHeight;
    let switcherHeight = this.#switcher.clientHeight;

    return parentHeight / 2 - switcherHeight / 2;
  }

  centerSwitcher() {
    this.#switcher.style.marginTop = `${this.calculateSwitcherMargin()}px`;
  }

  async animate(inversed, button) {
    this.#busy = true;

    let oldMargin = this.#switcher.style.marginTop;
    let newMargin = inversed ? this.calculateSwitcherMargin() : 0;

    let keyframes = [{ marginTop: oldMargin }, { marginTop: newMargin }];

    let timing = {
      duration: 100,
      fill: "forwards",
    };

    const animation = this.#switcher.animate(keyframes, timing);

    await animation.finished;

    animation.commitStyles();
    animation.cancel();

    this.#sectionActive = this.getIndexOfHTMLCollection(button, this.#buttons);
    console.log(`After animation: ${this.#sectionActive}`);
    this.#busy = false;
  }
}

export { SectionSwitcher };
