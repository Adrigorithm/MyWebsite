class PositionComponentToggler implements IPositionComponentToggler {
    activateOnYOffsetElements: Map<Element, number>;

    constructor() {
        this.activateOnYOffsetElements = new Map();
    }

    addComponents(activateOnYOffsetElements: Map<Element, number>): void {
        this.activateOnYOffsetElements = activateOnYOffsetElements;

        this.initialise();
    }
    
    
    initialise(): void {
        this.work();

        document.addEventListener("scroll", () => {
            this.work();
        })

        window.addEventListener("resize", () => {
            this.work();
        })
    }

    work(): void {
        let yOffset = window.scrollY;

        for (const [key, value] of this.activateOnYOffsetElements) {
            if (yOffset >= value)
                key.classList.remove("hidden");
            else
                key.classList.add("hidden");
        }
    }
}

export { PositionComponentToggler }