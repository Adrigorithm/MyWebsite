class SimpleSlider implements ISimpleSlider {
    activeElement: number;
    elements: Element[];

    constructor(rangeInputElement: HTMLInputElement, elements: Element[]) {
        this.activeElement = Number.parseInt(rangeInputElement.value);
        this.elements = elements;

        rangeInputElement.addEventListener("input", (inputEvent) => {
            this.styleActiveElement(Number.parseInt((inputEvent.target as HTMLInputElement).value))
        })
    }

    styleActiveElement(newId: number): void {
        if (this.activeElement == newId)
            return;

        this.elements[this.activeElement].classList.add("hidden");
        this.elements[newId].classList.remove("hidden");

        this.activeElement = newId;
    }
}

export { SimpleSlider }