interface ISquarifier {
    missingWidthSquares: HTMLElement[];
    missingHeightSquares: HTMLElement[];

    initialise(missingWidthSquares: HTMLElement[], missingHeightSquares: HTMLElement[]): void;
    work(): void;
}
