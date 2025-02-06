class SectionIndicator implements ISectionIndicator {
    siSections: Element[];
    siContents: Element[];

    constructor(siSections: Element[], siContents: Element[]) {
        this.siSections = siSections;
        this.siContents = siContents;

        this.initialise();
    }
    
    initialise(): void {
        document.addEventListener("scroll", () => this.scrollHandler)
    }

    scrollHandler(): void {
        
    }

    
}