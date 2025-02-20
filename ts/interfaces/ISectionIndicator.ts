interface ISectionIndicator {
    siSections: Element[];
    siContents: Element[];

    initialise(): void;
    work(): void;
    styleActiveElement(oldId: number | undefined, newId: number): void;
    determineActiveElement(): number;
}
