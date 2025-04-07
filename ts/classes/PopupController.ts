class PopupController implements IPopupController {
    popups: Map<HTMLElement, boolean>;

    constructor() {
        this.popups = new Map();
    }

    initialise(popups: Map<HTMLElement, HTMLElement[] | boolean>): void {
        for (const [popup, trigger] of popups) {
            this.popups.set(popup, false);

            if (typeof trigger === 'boolean') {
                if (trigger)
                    popup.classList.remove("hidden");
                
                continue;
            }

            trigger.forEach(element => {
                element.addEventListener("click", () => {})
            });
        }
    }

    work(): void {
        throw new Error("Method not implemented.");
    }
    
}