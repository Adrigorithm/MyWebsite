import { PositionComponentToggler } from "./PositionComponentToggler.js";
import { SectionIndicator } from "./SectionIndicator.js";
import { SettingContainer } from "./SettingContainer.js";
import { SimpleSlider } from "./SimpleSlider.js";
import { SlideShow } from "./SlideShow.js";
import { Squarifier } from "./Squarifier.js";

class ComponentHolder implements IComponentHolder {
    sectionIndicators: ISectionIndicator[];
    simpleSliders: ISimpleSlider[];
    slideShows: ISlideShow[];
    squarifier: ISquarifier;
    settingContainer: ISettingContainer;
    positionComponentToggler: IPositionComponentToggler;

    constructor() {
        this.settingContainer = new SettingContainer();
        this.settingContainer.processUrl();

        this.sectionIndicators = [];
        this.simpleSliders = [];
        this.slideShows = [];
        this.squarifier = new Squarifier();
        this.positionComponentToggler = new PositionComponentToggler();
    }
    
    addPositionComponentToggler(activateOnYOffsetElements: Map<Element, number>): void {
        this.positionComponentToggler.addComponents(activateOnYOffsetElements);
    }

    addSettings(localeElements: HTMLDivElement[], themeElements: HTMLDivElement[]): void {
        this.settingContainer.initSettingsMenu(localeElements, themeElements);
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