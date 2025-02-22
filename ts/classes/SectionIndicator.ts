class SectionIndicator implements ISectionIndicator {
    siSections: Element[];
    siContents: Element[];

    constructor(siSections: Element[], siContents: Element[]) {
        this.siSections = siSections;
        this.siContents = siContents;

        this.initialise();
    }
    
    initialise(): void {
        this.work();

        for (let i = 0; i < this.siSections.length; i++) {
            const element = this.siSections[i];
            
            element.addEventListener("click", () => {
                //this.styleActiveElement(i);
                this.siContents[i].scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            })
        }

        document.addEventListener("scroll", () => {
            this.work();
        })

        window.addEventListener("resize", () => {
            this.work();
        })
    }

    work(): void {
        let activeElementId = this.determineActiveElement();

        this.styleActiveElement(activeElementId);
    }

    styleActiveElement(newId: number): void {
        for (let i = 0; i < this.siContents.length; i++) {
            const element = this.siContents[i];
            
            if (i == newId) {
                element.classList.remove("p-6", "text-dim-gray");
                element.classList.add("p-2", "text-night", "dark:text-pale-dogwood", "bg-dim-gray/30");

                this.siSections[i].classList.remove("text-dim-gray");
                this.siSections[i].classList.add("text-night", "dark:text-pale-dogwood", "font-bold", "text-2xl");

                continue;
            }

            element.classList.remove("p-2", "text-night", "dark:text-pale-dogwood", "bg-dim-gray/30");
            element.classList.add("p-6", "text-dim-gray");

            this.siSections[i].classList.remove("text-night", "dark:text-pale-dogwood", "font-bold", "text-2xl");
            this.siSections[i].classList.add("text-dim-gray");
        }
    }

    determineActiveElement(): number {
        const viewPortYMiddle = window.visualViewport!.height / 2;
        let closest = 0
        let closestOffset = Number.MAX_VALUE;

        for (let index = 0; index < this.siContents.length; index++) {
            const element = this.siContents[index];
            const siContentBounds = this.siContents[index].getBoundingClientRect();
            const offset = Math.abs((siContentBounds.top + siContentBounds.bottom)/2 - viewPortYMiddle);

            if (offset < closestOffset) {
                closestOffset = offset;
                closest = index;
            }
        }
        
        return closest;
    }
}

export { SectionIndicator }