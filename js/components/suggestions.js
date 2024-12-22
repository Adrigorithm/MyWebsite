import { Component } from "./shared/component.js";

class Suggestions extends Component{
    constructor(config) {
        super(config);
    }

    toHTML() {
        let container = super.toHTML();

        container.textContent = "suggestions test";

        return container;
    }
}

export { Suggestions }