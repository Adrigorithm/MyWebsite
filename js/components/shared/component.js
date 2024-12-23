"use strict"

import { AccessMode, CommandStatus } from "../../enums.js";
import { Util } from "../../utilities.js";

class Component {
    config = null;

    constructor(config) {
        this.config = config;
    }

    toHTML() {
        let container = document.createElement("fieldset");
        container.style.border = `3px solid ${this.#commandColour(CommandStatus.SUCCESS)}`;
        
        let title = document.createElement("legend");
        Util.setInnerText(title, config.name);

        container.appendChild(title);

        return container;
    }

    #commandColour(status) {
        switch (status) {
            case CommandStatus.SUCCESS:
                return "green";
            case CommandStatus.FAILURE:
                return "red";
            default:
                return "grey";
        }
    }
}

export { Component }