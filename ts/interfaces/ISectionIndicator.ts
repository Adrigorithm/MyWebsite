interface ISectionIndicator {
    siSections: HTMLDivElement[];
    siContents: HTMLDivElement[];

    initialise(): void;
    work(): void;
    styleActiveElements(oldIds: number[] | undefined, newIds: number[]): void;
    determineActiveElements(): number[];
}
