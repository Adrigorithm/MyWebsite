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
    let counter = 0;

    for (const button of this.#buttons) {
      button.addEventListener("click", () => {
        if (this.#busy) return;

        this.switch(counter);
      });

      counter++;
    }

    window.addEventListener("resize", () => {
      if (this.#sectionActive == -1) return;

      this.centerSwitcher();
    });

    this.centerSwitcher();
  }

  switch(id) {
    this.animate(false);
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

  async animate(inversed) {
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

    this.#busy = false;
  }
}

export { SectionSwitcher };
