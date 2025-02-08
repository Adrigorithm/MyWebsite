interface ISectionIndicator {
    siSections: Element[];
    siContents: Element[];

    initialise(): void;
    work(): void;
    determineActiveElement(): number;
}
