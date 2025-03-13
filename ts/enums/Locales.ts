class Locales {
    static #english: string = "en-GB";
    static #dutch: string = "nl-BE";
    static #french: string = "fr-FR";
    static #german: string = "de-DE";
    static #catalan: string = "ca-AD";

    static get English(): string { return this.#english; }
    static get Dutch(): string { return this.#dutch; }
    static get French(): string { return this.#french; }
    static get German(): string { return this.#german; }
    static get Catalan(): string { return this.#catalan; }
}

export { Locales }