class PopupController implements IPopupController {
    popups: Map<HTMLElement, boolean>;

    constructor() {
        this.popups = new Map();
    }
    
    addPopup(popup: HTMLElement, toggleButtons: HTMLElement[], forceShow: boolean): void {
        this.popups.set(popup, false);

        if (forceShow)
            this.togglePopup(popup);

        toggleButtons.forEach((tb => {
            tb.addEventListener("click", () => {
                this.togglePopup(popup);
            });
        }));
    }

    togglePopup(popup: HTMLElement): void {
        let popupActive = this.popups.get(popup);

        if (popupActive) {
            popup.classList.add("hidden");
            this.popups.set(popup, false);

            return;
        }

        popup.classList.remove("hidden");
        this.popups.set(popup, true);
    }
}

export { PopupController }