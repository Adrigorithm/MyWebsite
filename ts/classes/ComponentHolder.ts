import { SectionIndicator } from "./SectionIndicator.js";
import { SimpleSlider } from "./SimpleSlider.js";
import { SlideShow } from "./SlideShow.js";
import { Squarifier } from "./Squarifier.js";

class ComponentHolder implements IComponentHolder {
    sectionIndicators: ISectionIndicator[];
    simpleSliders: ISimpleSlider[];
    slideShows: ISlideShow[];
    squarifier: ISquarifier;

    constructor() {
        this.sectionIndicators = [];
        this.simpleSliders = [];
        this.slideShows = [];
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

    addSlideShow(previousButton: HTMLDivElement, nextButton: HTMLDivElement, backgroundContents: HTMLDivElement[], background: HTMLDivElement, imgPaths: string[]) {
        this.slideShows.push(new SlideShow(previousButton, nextButton, backgroundContents, background, imgPaths));
    }
}

export { ComponentHolder }