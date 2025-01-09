import { Component } from "./shared/component.js";

class Suggestions extends Component {
    constructor(config) {
        super(config);
    }

    toHTML() {
        const container = super.toHTML();
        
        let content = container.querySelector(".commandHistoryContent");
        content.classList.add("flex", "flex-col", "flex-wrap", "sm:flex-row");

        content.append(...this.config.params[0]);

        return container;
    }
}

export { Suggestions }