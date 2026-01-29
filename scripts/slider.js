class Slider {
  #slider = undefined;
  #previousButton = undefined;
  #nextButton = undefined;
  #slideIndicator = undefined;
  #activeSlideIndicator = 0;
  #mouseDownCoordinate = null;
  #activeSlideIndex = 0;
  #busy = false;

  constructor(slider, previousButton, nextButton, slideIndicator) {
    this.#slider = slider;
    this.#previousButton = previousButton;
    this.#nextButton = nextButton;
    this.#slideIndicator = slideIndicator;
  }

  setup() {
    if (this.#slider.children.length < 2) return;

    this.#slider.addEventListener("mousedown", (e) => {
      this.#mouseDownCoordinate = e.pageX;
    });

    document.addEventListener("mouseup", () => {
      this.#mouseDownCoordinate = null;
    });

    this.#slider.addEventListener("mouseup", (e) => {
      if (!this.#mouseDownCoordinate) return;

      const moveDistance = e.pageX - this.#mouseDownCoordinate;

      if (moveDistance < -100) this.next();
      else if (moveDistance > 100) this.previous();
    });

    this.#previousButton.addEventListener("click", () => {
      this.previous();
    });

    this.#nextButton.addEventListener("click", () => {
      this.next();
    });

    for (const slide of this.#slider.children)
      slide.addEventListener("click", () => {
        if (!this.#busy) this.moveTo(slide);
      });
  }

  moveTo(slide) {
    for (let i = 0; i < this.#slider.children.length; i++) {
      const sliderSlide = this.#slider.children.item(i);

      if (sliderSlide !== slide) continue;

      if (this.#activeSlideIndex === i) break;

      this.#activeSlideIndex = i;

      void this.animate(i);

      break;
    }
  }

  next() {
    let newActiveSlideIndex = this.#activeSlideIndex + 1;

    if (newActiveSlideIndex === this.#slider.children.length) {
      this.#activeSlideIndex = 0;

      void this.animate(0);
    } else {
      this.#activeSlideIndex = newActiveSlideIndex;

      void this.animate(newActiveSlideIndex);
    }
  }

  previous() {
    let newActiveSlideIndex = this.#activeSlideIndex - 1;

    if (newActiveSlideIndex < 0) {
      const lastSlideIndex = this.#slider.children.length - 1;
      this.#activeSlideIndex = lastSlideIndex;

      void this.animate(lastSlideIndex);
    } else {
      this.#activeSlideIndex = newActiveSlideIndex;

      void this.animate(newActiveSlideIndex);
    }
  }

  setActiveIndicator() {
    if (this.#activeSlideIndex === this.#activeSlideIndicator) return;

    this.#slideIndicator.children[this.#activeSlideIndex].getElementsByTagName(
      "svg",
    )[0].classList = "h-8 fill-cosmic dark:fill-lilac";
    this.#slideIndicator.children[
      this.#activeSlideIndicator
    ].getElementsByTagName("svg")[0].classList =
      "h-6 fill-gray-300 dark:fill-gray-800";

    this.#activeSlideIndicator = this.#activeSlideIndex;
  }

  async animate(activeSlideIndex) {
    this.#busy = true;

    let currentMargin = this.#slider.firstElementChild.style.marginLeft;
    let newMargin = `-${100 * activeSlideIndex}%`;

    let keyframes = [
      { marginLeft: this.#slider.firstElementChild.style.marginLeft },
      { marginLeft: newMargin },
    ];

    let timing = {
      duration: 500,
      fill: "forwards",
    };

    const animation = this.#slider.firstElementChild.animate(keyframes, timing);

    await animation.finished;

    animation.commitStyles();
    animation.cancel();

    this.setActiveIndicator();

    this.#busy = false;
  }
}

export { Slider };
