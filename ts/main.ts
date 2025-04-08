import { ComponentHolder } from "./classes/ComponentHolder.js"
import { Popups } from "./enums/Popups.js";

let componentHolder: undefined | ComponentHolder = undefined;

initialise();
document.addEventListener("DOMContentLoaded", loaded);

function initialise(): void {
    initComponentHolder();
}

function loaded(): void {
    initSectionIndicators();
    initSimpleSliders();
    initSlideShows();
    initSquarifier();
    initSettings();
    initPositionComponentToggler();
    initPopupController();
}

function initComponentHolder(): void {
    componentHolder = new ComponentHolder();
}

function initSettings(): void {
    let localeElements: HTMLCollection | undefined = document.getElementById("localeSettings")?.children;
    let themeElements: HTMLCollection | undefined = document.getElementById("themeSettings")?.children;

    componentHolder?.addSettings(Array.from(localeElements ?? []) as HTMLDivElement[], Array.from(themeElements ?? []) as HTMLDivElement[]);
}

function initSectionIndicators(): void {
    let siSections: HTMLCollectionOf<Element> = document.getElementsByClassName("si-section");
    let siContents: HTMLCollectionOf<Element> = document.getElementsByClassName("si-content");

    for (let index = 0; index < siSections.length; index++) {
        componentHolder!.addSectionIndicator(Array.from(siSections[index].children), Array.from(siContents[index].children));
    }
} 

function initSimpleSliders(): void {
    let sliders: HTMLCollectionOf<Element> = document.getElementsByClassName("simpleSlider");
    let sliderContents: HTMLCollectionOf<Element> = document.getElementsByClassName("simpleSliderContent");

    for (let index = 0; index < sliders.length; index++) {
        let inputElement = sliders[index] as HTMLInputElement;

        componentHolder!.addSimpleSlider(inputElement, Array.from(sliderContents).slice(0, Number.parseInt(inputElement.max) + 1));
    }
}

function initSlideShows(): void {
    let slideShows: HTMLCollectionOf<Element> = document.getElementsByClassName("slideShow");
    
    for (let index = 0; index < slideShows.length; index++) {
        let slideShow = slideShows[index] as HTMLDivElement;
        let previousButton: HTMLDivElement = slideShow.firstElementChild as HTMLDivElement;
        let nextButton: HTMLDivElement = slideShow.lastElementChild as HTMLDivElement;
        let contents: HTMLDivElement[] = Array.from(slideShow.children).slice(1, -1) as HTMLDivElement[];
        let imgPaths: string[] = getData(slideShow.id);

        componentHolder!.addSlideShow(previousButton, nextButton, contents, slideShow, imgPaths);
    }
}

function initSquarifier(): void {
    let missingHeightSquares: HTMLCollectionOf<Element> = document.getElementsByClassName("noYElement");
    let missingWidthSquares: HTMLCollectionOf<Element> = document.getElementsByClassName("noXElement");

    componentHolder!.addSquares(Array.from(missingHeightSquares) as HTMLElement[], Array.from(missingWidthSquares) as HTMLElement[]);
}

function initPositionComponentToggler(): void {
    let map: Map<Element, number> = new Map();
    let elements = document.getElementsByClassName("yOffsetToggle");

    for (let index = 0; index < elements.length; index++) {
        const element = elements[index] as HTMLElement;
        
        map.set(element, element.dataset.value as unknown as number)
    }

    componentHolder!.addPositionComponentToggler(map);
}

function initPopupController(): void {
    let elements = document.getElementsByClassName("popup");

    for (let index = 0; index < elements.length; index++) {
        const element = elements[index] as HTMLElement;
        let popupKey = element.dataset.value as string;
        let triggerButtons = Array.from(document.getElementsByClassName(`popup-${popupKey}`)) as HTMLElement[];

        componentHolder!.addPopup(element, triggerButtons, showPopup(popupKey))
    }
}

function getData(id: string): string[] {
    switch (id) {
        case "slideShowProjects":
            return [
                "bg-[url(/assets/img/projects/Adribot.git.avif)]",
                "bg-[url(/assets/img/projects/AdriTemplater.git.avif)]",
                "bg-[url(/assets/img/projects/MyWebsite.git.avif)]"
            ];
        default:
            return [];
    }
}

function showPopup(popupKey: string): boolean {
    switch (popupKey) {
        case Popups.Locale:
            let lsItem = localStorage.getItem("locale");
            
            return lsItem == null;
        default:
            return false;
    }
    
}