class PopupController implements IPopupController {
    popups: HTMLElement[];

    constructor() {
        this.popups = [];
    }

    initialise(popups: Map<HTMLElement[], HTMLElement[] | boolean>): void {
        for (const [popup, trigger] of popups) {
            
        }
    }

    work(): void {
        throw new Error("Method not implemented.");
    }
    
}