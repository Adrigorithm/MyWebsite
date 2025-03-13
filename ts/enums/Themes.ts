class Themes {
    static #dark: string = "dark";
    static #light: string = "light";

    static get Dark(): string { return this.#dark; }
    static get Light(): string { return this.#light; }
}
