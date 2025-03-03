interface IComponentHolder {
    sectionIndicators: ISectionIndicator[];
    simpleSliders: ISimpleSlider[];
    squarifier: ISquarifier;

    addSectionIndicator(siSections: Element[], siContents: Element[]): void;
    addSimpleSlider(rangeInputElement: HTMLInputElement, elements: Element[]): void;
    addSquares(missingHeightSquares: HTMLElement[], missingWidthSquares: HTMLElement[]): void;
}
