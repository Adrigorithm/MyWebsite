interface ISimpleSlider {
    activeElement: number;
    elements: Element[];

    styleActiveElement(newId: number): void;
}