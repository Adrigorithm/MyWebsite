class Slider {
    #slider = undefined;
    #mouseDownCoordinate = null;
    #activeSlideIndex = 0;
    #busy = false;

    constructor(slider) {
        this.#slider = slider;
    }

    setup() {
        if (this.#slider.children.length < 2)
            return;

        this.#slider.addEventListener("mousedown", (e) => {
            this.#mouseDownCoordinate = e.pageX;
        })

        document.addEventListener("mouseup", () => {
            this.#mouseDownCoordinate = null;
        })

        this.#slider.addEventListener("mouseup", (e) => {
            if (!this.#mouseDownCoordinate)
                return;

            const moveDistance = e.pageX - this.#mouseDownCoordinate;

            if (moveDistance < -100)
                this.previous();
            else if (moveDistance > 100)
                this.next();
        })

        for (const slide of this.#slider.children)
            slide.addEventListener("click", () => {
                if (!this.#busy)
                    this.moveTo(slide);
            });
    }

    moveTo(slide) {
        for (let i = 0; i < this.#slider.children.length; i++) {
            const sliderSlide = this.#slider.children.item(i);

            if (sliderSlide !== slide)
                continue;

            if (this.#activeSlideIndex === i)
                break;

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
            this.#activeSlideIndex = lastSlideIndex

            void this.animate(lastSlideIndex);
        } else {
            this.#activeSlideIndex = newActiveSlideIndex;

            void this.animate(newActiveSlideIndex);
        }
    }

    async animate(activeSlideIndex) {
        this.#busy = true;

        let animation = this.#slider.firstElementChild.animate(
            [
                { marginLeft: this.#slider.firstElementChild.style.marginLeft },
                { marginLeft: `-${100 * activeSlideIndex}%`}
            ],
            500
        );

        await animation.finished;

        animation.commitStyles();
        animation.cancel();

        this.#busy = false;
    }
}

export { Slider };
