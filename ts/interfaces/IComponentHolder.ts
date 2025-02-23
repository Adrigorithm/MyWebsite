interface IComponentHolder {
    sectionIndicators: ISectionIndicator[]
    simpleSliders: ISimpleSlider[]

    addSectionIndicator(siSections: Element[], siContents: Element[]): void
    addSimpleSlider(rangeInputElement: HTMLInputElement, elments: Element[]): void
}
