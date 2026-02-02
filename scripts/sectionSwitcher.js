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
    for (let i = 0; i < this.#buttons.length; i++) {
      const button = this.#buttons.item(i);

      button.addEventListener("click", () => {
        if (this.#busy) return;

        this.switch(i);
      });
    }

    window.addEventListener("resize", () => {
      if (this.#sectionActive >= 0) return;

      this.centerSwitcher();
    });

    this.centerSwitcher();
  }

  switch(buttonIndex) {
    let activeSection = this.#sectionActive;

    void this.animateSwitcher(false, buttonIndex, () => {
      void this.animateSection(activeSection, this.#sectionActive);
    });
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

  async animateSection(oldSectionId, newSectionId) {
    let keyframes = undefined;
    let timing = {
      duration: 1000,
      fill: "forwards",
    };

    if (oldSectionId > -1) {
      let oldSection = this.#sections.item(oldSectionId);
      keyframes = [{ opacity: 1 }, { opacity: 0 }];
      const animation = oldSection.animate(keyframes, timing);

      await animation.finished;

      animation.commitStyles();
      animation.cancel();

      oldSection.classList.add("hidden");
    }

    let newSection = this.#sections.item(newSectionId);

    newSection.classList.remove("hidden");

    keyframes = [{ opacity: 0 }, { opacity: 1 }];
    const animation = newSection.animate(keyframes, timing);

    await animation.finished;

    animation.commitStyles();
    animation.cancel();
  }

  async animateSwitcher(inverted, buttonIndex, callback) {
    if (this.#sectionActive === -1) {
      this.#busy = true;

      let oldMargin = this.#switcher.style.marginTop;
      let newMargin = inverted ? this.calculateSwitcherMargin() : 0;

      let keyframes = [{ marginTop: oldMargin }, { marginTop: newMargin }];

      let timing = {
        duration: 300,
        fill: "forwards",
      };

      const animation = this.#switcher.animate(keyframes, timing);

      await animation.finished;

      animation.commitStyles();
      animation.cancel();

      this.#busy = false;
    } else {
      this.#buttons.item(this.#sectionActive).classList.remove("border-b-2");
    }

    this.#sectionActive = buttonIndex;

    this.#buttons.item(this.#sectionActive).classList.add("border-b-2");
    callback();
  }
}

export { SectionSwitcher };
