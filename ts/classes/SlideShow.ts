class SlideShow implements ISlideShow {
    activeElement: number;
    imgPaths: string[];
    previousButton: HTMLDivElement;
    nextButton: HTMLDivElement;
    backgroundContents: HTMLDivElement[];
    background: HTMLDivElement;

    constructor(previousButton: HTMLDivElement, nextButton: HTMLDivElement, backgroundContents: HTMLDivElement[], background: HTMLDivElement, imgPaths: string[]) {
        this.previousButton = previousButton;
        this.nextButton = nextButton;
        this.backgroundContents = backgroundContents;
        this.background = background;
        this.activeElement = 0;
        this.imgPaths = imgPaths;

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
        this.background.classList.replace(this.imgPaths[oldActiveElement], this.imgPaths[newActiveElement]);
        this.backgroundContents[oldActiveElement].classList.add("hidden");
        this.backgroundContents[newActiveElement].classList.remove("hidden");
    }

    nextActiveElement(invert: boolean): void {
        let oldActiveElement: number = this.activeElement;

        if (invert)
            this.activeElement = this.activeElement == 0 ? this.imgPaths.length - 1 : this.activeElement - 1;
        else
            this.activeElement = this.activeElement == this.imgPaths.length - 1 ? 0 : this.activeElement + 1;

        this.styleActiveElement(oldActiveElement, this.activeElement);
    }
}

export { SlideShow }