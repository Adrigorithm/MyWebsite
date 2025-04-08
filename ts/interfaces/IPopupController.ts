interface IPopupController {
    popups: Map<HTMLElement, boolean>;

    addPopup(popup: HTMLElement, toggleButtons: HTMLElement[], forceShow: boolean): void;
    togglePopup(popup: HTMLElement): void;
}