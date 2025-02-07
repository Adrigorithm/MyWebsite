class ComponentHolder implements IComponentHolder {
    sectionIndicators: ISectionIndicator[];

    constructor() {
        this.sectionIndicators = [];
    }

    addSectionIndicators(siSections: Element[], siContents: Element[]): void {
        this.sectionIndicators.push(new SectionIndicator(siSections, siContents));
    }
}

export { ComponentHolder }