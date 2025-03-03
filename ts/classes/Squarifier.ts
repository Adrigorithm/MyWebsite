class Squarifier implements ISquarifier {
    missingWidthSquares: HTMLElement[];
    missingHeightSquares: HTMLElement[];

    constructor() {
        this.missingHeightSquares = [];
        this.missingWidthSquares = [];
    }

    initialise(missingWidthSquares: HTMLElement[], missingHeightSquares: HTMLElement[]): void {
        this.missingHeightSquares = missingHeightSquares;
        this.missingWidthSquares = missingWidthSquares;

        this.work();

        window.addEventListener("resize", () => {
            this.work();
        })
    }

    work(): void {
        this.missingHeightSquares.forEach((square) => {
            square.style.height = square.clientWidth + "px";
        })

        this.missingWidthSquares.forEach((square) => {
            square.style.width = square.clientHeight + "px";
        })
    }
}

export { Squarifier }