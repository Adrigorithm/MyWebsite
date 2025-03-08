interface ISlideShow {
    activeElement: number;
    previousButton: HTMLDivElement;
    nextButton: HTMLDivElement;
    backgroundContents: HTMLDivElement[];
    background: HTMLDivElement;
    imgPaths: string[];

    initialise(): void;
    styleActiveElement(oldActiveElement: number, newActiveElement: number): void;
    nextActiveElement(invert: boolean): void;
}