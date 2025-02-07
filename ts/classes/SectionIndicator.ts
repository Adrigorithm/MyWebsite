class SectionIndicator implements ISectionIndicator {
    siSections: Element[];
    siContents: Element[];

    constructor(siSections: Element[], siContents: Element[]) {
        this.siSections = siSections;
        this.siContents = siContents;

        this.initialise();
    }
    
    initialise(): void {
        document.addEventListener("scroll", this.scrollHandler)
    }

    scrollHandler(): void {
        const activeElement = this.determineActiveElement();

        this.siContents[activeElement].setAttribute("style", "color: green");
    }

    determineActiveElement(): number {
        const viewPortYMiddle = window.visualViewport!.height / 2;
        let closest = 0
        let closestOffset = Number.MAX_VALUE;

        for (let index = 0; index < this.siContents.length; index++) {
            const element = this.siContents[index];
            const siContentBounds = this.siContents[index].getBoundingClientRect();
            const offset = Math.abs((siContentBounds.top + siContentBounds.bottom)/2 - viewPortYMiddle);

            element.setAttribute("style", "color: red");

            if (offset < closestOffset) {
                closestOffset = offset;
                closest = index;
            }
        }
        
        return closest;
    }
}
