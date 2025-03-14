class Translator implements ITranslator {
    textNodes: Text[];

    constructor(textNodes: Text[]) {
        this.textNodes = textNodes;
    }

    translate(countryId: number): void {
        throw new Error("Method not implemented.");
    }
}