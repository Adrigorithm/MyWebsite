class PositionComponentToggler implements IPositionComponentToggler {
    activateOnYOffsetElements: Map<Element, number | string>;

    constructor() {
        this.activateOnYOffsetElements = new Map();
    }

    addComponents(activateOnYOffsetElements: Map<Element, number | string>): void {
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
        for (let [key, value] of this.activateOnYOffsetElements) {
            if (typeof value === "string") {
                switch (value) {
                    case "h-screen":
                        value = window.visualViewport!.height
                        break;
                    default:
                        value = 100;
                }
            }

            if (window.scrollY >= value)
                key.classList.remove("hidden");
            else
                key.classList.add("hidden");
        }
    }
}

export { PositionComponentToggler }