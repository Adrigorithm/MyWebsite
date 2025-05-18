class SectionIndicator implements ISectionIndicator {
    siSections: HTMLDivElement[];
    siContents: HTMLDivElement[];

    constructor(siSections: HTMLDivElement[], siContents: HTMLDivElement[]) {
        this.siSections = siSections;
        this.siContents = siContents;

        this.initialise();
    }
    
    initialise(): void {
        this.work();

        for (let i = 0; i < this.siSections.length; i++) {
            const element = this.siSections[i];
            
            element.addEventListener("click", () => {
                this.siContents[i].scrollIntoView({
                    behavior: "smooth"
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
        let activeElementIds = this.determineActiveElements();

        this.styleActiveElements(activeElementIds);
    }

    styleActiveElements(newIds: number[]): void {
        for (let i = 0; i < this.siContents.length; i++) {
            const element = this.siContents[i];
            const newIdIndice = newIds.findIndex(id => id == i);
            
            if (newIdIndice != -1) {
                newIds.splice(newIdIndice, 1);

                element.classList.remove("text-dim-gray");
                element.classList.add("px-2", "text-night", "dark:text-pale-dogwood", "sunset:text-icterine", "bg-dim-gray/30");

                this.siSections[i].classList.remove("text-dim-gray");
                this.siSections[i].classList.add("text-night", "dark:text-pale-dogwood", "sunset:text-icterine", "font-bold", "text-2xl");

                continue;
            }

            element.classList.remove("px-2", "text-night", "dark:text-pale-dogwood", "sunset:text-icterine", "bg-dim-gray/30");
            element.classList.add("text-dim-gray");

            this.siSections[i].classList.remove("text-night", "dark:text-pale-dogwood", "sunset:text-icterine", "font-bold", "text-2xl");
            this.siSections[i].classList.add("text-dim-gray");
        }
    }

    determineActiveElements(): number[] {
        let activeElementIds: number[] = [];

        const viewport = window.visualViewport;
        const viewportHeight = viewport!.height;
        const viewportStartY = viewport!.pageTop;
        const viewportStopY = viewportStartY + viewportHeight;

        for (let index = 0; index < this.siContents.length; index++) {
            const element = this.siContents[index];

            const siContentStartY = element.offsetTop;
            const siContentHeight = element.clientHeight;
            const siContentStopY = siContentStartY + siContentHeight;

            if (siContentStopY > viewportStartY && siContentStartY < viewportStopY) {
                if (siContentStartY < viewportStartY) {
                    if ((siContentStopY - viewportStartY) > (viewportHeight * .5))
                        activeElementIds.push(index);
                } else {
                    if (siContentStopY < viewportStopY || ((viewportStopY - siContentStartY) > (viewportHeight * .5)))
                        activeElementIds.push(index);
                }
            }
        }
        
        return activeElementIds;
    }
}

export { SectionIndicator }
