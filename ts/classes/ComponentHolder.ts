import { SectionIndicator } from "./SectionIndicator.js";
import { SimpleSlider } from "./SimpleSlider.js";

class ComponentHolder implements IComponentHolder {
    sectionIndicators: ISectionIndicator[];
    simpleSliders: ISimpleSlider[];

    constructor() {
        this.sectionIndicators = [];
        this.simpleSliders = [];
    }

    addSectionIndicator(siSections: Element[], siContents: Element[]): void {
        this.sectionIndicators.push(new SectionIndicator(siSections, siContents));
    }

    addSimpleSlider(rangeInputElement: HTMLInputElement, elements: Element[]): void {
        this.simpleSliders.push(new SimpleSlider(rangeInputElement, elements));
    }
}

export { ComponentHolder }