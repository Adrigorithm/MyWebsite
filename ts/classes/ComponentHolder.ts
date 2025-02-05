class ComponentHolder implements IComponentHolder {
    sectionIndicators: SectionIndicator[];

    constructor(sectionIndicators: Element[]) {
        this.sectionIndicators = [];

        sectionIndicators.forEach(e => this.sectionIndicators.push(new SectionIndicator(e)));
    }
}