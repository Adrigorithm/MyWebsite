interface IPositionComponentToggler {
    activateOnYOffsetElements: Map<Element, number>

    addComponents(activateOnYOffsetElements: Map<Element, number>): void
    initialise(): void;
    work(): void;
}