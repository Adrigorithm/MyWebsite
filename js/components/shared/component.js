"use strict"

import { CommandStatus } from "../../enums.js";
import { Util } from "../../utilities.js";

class Component {
    config = null;

    constructor(config) {
        this.config = config;
    }

    toHTML() {
        let container = document.createElement("div");
        container.classList.add("border-4", "border-solid", `border-${this.#commandColour(CommandStatus.SUCCESS)}`);
        
        let title = document.createElement("h4");
        Util.setInnerText(title, this.config.command.name);
        title.classList.add("bg-red-700", "absolute", "ml-3", "-mt-4", "px-2");

        let content = document.createElement("div");
        content.classList.add("commandHistoryContent");

        container.append(title, content);

        return container;
    }

    logInvalidParams(param) {
        param
            ? this.config.logger.error(`Command: ${this.config.command.name} has invalid parameter value for ${param}, run help ${this.config.command.name}`, true)
            : this.config.logger.error(`Command: ${this.config.command.name} has invalid parameters, run help ${this.config.command.name}`, true);
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