import { ComponentHolder } from "./classes/ComponentHolder.js"

document.addEventListener("load", loaded);

let componentHolder: undefined | ComponentHolder = undefined;

function loaded() {
    initComponentHolder();
    initSectionIndicators();
}

function initComponentHolder() {
    componentHolder = new ComponentHolder();
}

function initSectionIndicators() {
    let siSections = document.getElementsByClassName("si-section");
    let siContents = document.getElementsByClassName("si-content");


    for (const SectionIndicator of sectionIndicators) {
        sectionIndicators.
    }
} 