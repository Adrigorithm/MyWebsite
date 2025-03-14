interface ITranslator {
    textNodes: Text[];
    locale: 0;

    translate(countryId: number): void;
}