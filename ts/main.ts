import { ComponentHolder } from "./classes/ComponentHolder.js"

document.addEventListener("DOMContentLoaded", loaded);

let componentHolder: undefined | ComponentHolder = undefined;

function loaded() {
    initComponentHolder();
    initSectionIndicators();
    initSimpleSliders();
}

function initComponentHolder() {
    componentHolder = new ComponentHolder();
}

function initSectionIndicators() {
    let siSections = document.getElementsByClassName("si-section");
    let siContents = document.getElementsByClassName("si-content");

    for (let index = 0; index < siSections.length; index++) {
        componentHolder!.addSectionIndicator(Array.from(siSections[index].children), Array.from(siContents[index].children));
    }
} 

function initSimpleSliders() {
    let sliders = document.getElementsByClassName("simpleSlider");
    let sliderContents = document.getElementsByClassName("simpleSliderContent");

    for (let index = 0; index < sliders.length; index++) {
        let inputElement = sliders[index] as HTMLInputElement;

        componentHolder!.addSimpleSlider(inputElement, Array.from(sliderContents).slice(0, Number.parseInt(inputElement.max) + 1));
    }
}