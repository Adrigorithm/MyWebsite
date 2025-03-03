import { SectionIndicator } from "./SectionIndicator.js";
import { SimpleSlider } from "./SimpleSlider.js";
import { Squarifier } from "./Squarifier.js";

class ComponentHolder implements IComponentHolder {
    sectionIndicators: ISectionIndicator[];
    simpleSliders: ISimpleSlider[];
    squarifier: ISquarifier;

    constructor() {
        this.sectionIndicators = [];
        this.simpleSliders = [];
        this.squarifier = new Squarifier();
    }
    
    addSquares(missingHeightSquares: HTMLElement[], missingWidthSquares: HTMLElement[]): void {
        this.squarifier.initialise(missingWidthSquares, missingHeightSquares);
    }

    addSectionIndicator(siSections: Element[], siContents: Element[]): void {
        this.sectionIndicators.push(new SectionIndicator(siSections, siContents));
    }

    addSimpleSlider(rangeInputElement: HTMLInputElement, elements: Element[]): void {
        this.simpleSliders.push(new SimpleSlider(rangeInputElement, elements));
    }
}

export { ComponentHolder }