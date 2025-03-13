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

    static match(locale: string): string {
        switch (locale.toUpperCase()) {
            case this.#english.toUpperCase():
                return this.#english;
            case this.#dutch.toUpperCase():
                return this.#dutch;
            case this.#french.toUpperCase():
                return this.#french;
            case this.#german.toUpperCase():
                return this.#german;
            case this.#catalan.toUpperCase():
                return this.#catalan;    
            default:
                return this.#english;
        }
    }
}
