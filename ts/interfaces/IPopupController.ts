interface IPopupController {
    popups: Map<HTMLElement, boolean>;

    initialise(popups: Map<HTMLElement, HTMLElement[] | boolean>): void;
    work(): void;
}