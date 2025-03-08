interface IComponentHolder {
    sectionIndicators: ISectionIndicator[];
    simpleSliders: ISimpleSlider[];
    slideShows: ISlideShow[];
    squarifier: ISquarifier;

    addSectionIndicator(siSections: Element[], siContents: Element[]): void;
    addSimpleSlider(rangeInputElement: HTMLInputElement, elements: Element[]): void;
    addSquares(missingHeightSquares: HTMLElement[], missingWidthSquares: HTMLElement[]): void;
    addSlideShow(previousButton: HTMLDivElement, nextButton: HTMLDivElement, backgroundContents: HTMLDivElement[], background: HTMLDivElement, imgPaths: string[]): void;
}
