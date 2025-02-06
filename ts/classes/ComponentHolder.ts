class ComponentHolder implements IComponentHolder {
    sectionIndicators: SectionIndicator[];

    constructor() {
        this.sectionIndicators = [];
    }

    setSectionIndicators(siSections: Element[], siContents: Element[]): void {

        throw new Error("Method not implemented.");
    }
}

export { ComponentHolder }