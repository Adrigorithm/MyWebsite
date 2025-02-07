interface ISectionIndicator {
    siSections: Element[];
    siContents: Element[];

    initialise(): void;
    scrollHandler(): void;
    determineActiveElement(): number;
}
