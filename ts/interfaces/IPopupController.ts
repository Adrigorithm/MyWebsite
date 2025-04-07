interface IPopupController {
    popups: HTMLElement[];

    initialise(popups: Map<HTMLElement[], HTMLElement[] | boolean>): void;
    work(): void;
}