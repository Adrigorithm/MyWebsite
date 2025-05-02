interface ISlideShow {
    activeElement: number;
    previousButton: HTMLDivElement;
    nextButton: HTMLDivElement;
    slides: HTMLDivElement[];

    initialise(): void;
    styleActiveElement(oldActiveElement: number, newActiveElement: number): void;
    nextActiveElement(invert: boolean): void;
}