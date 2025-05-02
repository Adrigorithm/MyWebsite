class SlideShow implements ISlideShow {
    activeElement: number;
    previousButton: HTMLDivElement;
    nextButton: HTMLDivElement;
    slides: HTMLDivElement[];


    constructor(previousButton: HTMLDivElement, nextButton: HTMLDivElement, slide: HTMLDivElement[]) {
        this.previousButton = previousButton;
        this.nextButton = nextButton;
        this.slides = slide;
        this.activeElement = 0;

        this.initialise();
    }
    
    initialise(): void {
        this.previousButton.addEventListener("click", () => {
            this.nextActiveElement(true);
        });

        this.nextButton.addEventListener("click", () => {
            this.nextActiveElement(false);
        });
    }

    styleActiveElement(oldActiveElement: number, newActiveElement: number): void {
        this.slides[oldActiveElement].classList.add("hidden");
        this.slides[newActiveElement].classList.remove("hidden");
    }

    nextActiveElement(invert: boolean): void {
        let oldActiveElement: number = this.activeElement;

        if (invert)
            this.activeElement = this.activeElement == 0 ? this.slides.length - 1 : this.activeElement - 1;
        else
            this.activeElement = this.activeElement == this.slides.length - 1 ? 0 : this.activeElement + 1;

        this.styleActiveElement(oldActiveElement, this.activeElement);
    }
}

export { SlideShow }