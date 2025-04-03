interface IPositionComponentToggler {
    activateOnYOffsetElements: Map<Element, number | string>

    addComponents(activateOnYOffsetElements: Map<Element, number | string>): void
    initialise(): void;
    work(): void;
}