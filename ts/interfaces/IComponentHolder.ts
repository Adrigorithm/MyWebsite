interface IComponentHolder {
    sectionIndicators: ISectionIndicator[];
    simpleSliders: ISimpleSlider[];
    slideShows: ISlideShow[];
    squarifier: ISquarifier;
    settingContainer: ISettingContainer;
    positionComponentToggler: IPositionComponentToggler;
    popupController: IPopupController;

    addSettings(localeElements: HTMLDivElement[], themeElements: HTMLDivElement[]): void;
    addSectionIndicator(siSections: Element[], siContents: Element[]): void;
    addSimpleSlider(rangeInputElement: HTMLInputElement, elements: Element[]): void;
    addSquares(missingHeightSquares: HTMLElement[], missingWidthSquares: HTMLElement[]): void;
    addSlideShow(previousButton: HTMLDivElement, nextButton: HTMLDivElement, backgroundContents: HTMLDivElement[], background: HTMLDivElement, imgPaths: string[]): void;
    addPositionComponentToggler(activateOnYOffsetElements: Map<Element, number>): void;
    addPopup(popup: HTMLElement, toggleButtons: HTMLElement[], forceShow: boolean): void;
}
