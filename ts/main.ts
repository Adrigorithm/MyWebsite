import { ComponentHolder } from "./classes/ComponentHolder.js"

document.addEventListener("DOMContentLoaded", loaded);

let componentHolder: undefined | ComponentHolder = undefined;

function loaded() {
    initComponentHolder();
    initSectionIndicators();
    initSimpleSliders();
    initSlideShows();
    initSquarifier();
}

function initComponentHolder() {
    componentHolder = new ComponentHolder();
}

function initSectionIndicators() {
    let siSections: HTMLCollectionOf<Element> = document.getElementsByClassName("si-section");
    let siContents: HTMLCollectionOf<Element> = document.getElementsByClassName("si-content");

    for (let index = 0; index < siSections.length; index++) {
        componentHolder!.addSectionIndicator(Array.from(siSections[index].children), Array.from(siContents[index].children));
    }
} 

function initSimpleSliders() {
    let sliders: HTMLCollectionOf<Element> = document.getElementsByClassName("simpleSlider");
    let sliderContents: HTMLCollectionOf<Element> = document.getElementsByClassName("simpleSliderContent");

    for (let index = 0; index < sliders.length; index++) {
        let inputElement = sliders[index] as HTMLInputElement;

        componentHolder!.addSimpleSlider(inputElement, Array.from(sliderContents).slice(0, Number.parseInt(inputElement.max) + 1));
    }
}

function initSlideShows() {
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

function initSquarifier() {
    let missingHeightSquares: HTMLCollectionOf<Element> = document.getElementsByClassName("noYElement");
    let missingWidthSquares: HTMLCollectionOf<Element> = document.getElementsByClassName("noXElement");

    componentHolder!.addSquares(Array.from(missingHeightSquares) as HTMLElement[], Array.from(missingWidthSquares) as HTMLElement[]);
}

function getData(id: string): string[] {
    switch (id) {
        case "slideShowProjects":
            return [
                "bg-[url(/assets/img/projects/MyWebsite.git.avif)]",
                "bg-[url(/assets/img/projects/Adribot.git.avif)]",
                "bg-[url(/assets/img/projects/AdriTemplater.git.avif)]"
            ];
        default:
            return [];
    }
}