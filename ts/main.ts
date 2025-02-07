import { ComponentHolder } from "./classes/ComponentHolder.js"

document.addEventListener("DOMContentLoaded", loaded);

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

    for (let index = 0; index < siSections.length; index++) {
        componentHolder!.addSectionIndicators(Array.from(siSections[index].children), Array.from(siContents[index].children));
    }
} 