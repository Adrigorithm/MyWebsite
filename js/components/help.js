"use strict";

import { AccessMode } from "../enums.js";
import { Util } from "../utilities.js";
import { Component } from "./shared/component.js";

class Help extends Component {
    constructor(config) {
        super(config);
    }

    toHTML() {
        const container = super.toHTML();
        
        let content = container.querySelector(".commandHistoryContent");
        content.classList.add("flex", "flex-row", "flex-wrap");

        let contentHeader = document.createElement("div");
        contentHeader.classList.add("flex", "flex-col", "justify between");

        let commandName = document.createElement("p");
        let commandName0 = document.createElement("p");

        Util.setInnerText(commandName, this.config.command.name);
        Util.setInnerText(commandName0, this.config.command.name);

        let title = document.createElement("h5");
        Util.setInnerText(title, "Adri's Command Manual");

        contentHeader.append(commandName, title, commandName0);

        let name = document.createElement("h6");
        Util.setInnerText(name, "Name");

        let nameContent = document.createElement("p");
        Util.setInnerText(nameContent, this.config.command.name);
        if (this.config.command.description_short)
            Util.setInnerText(nameContent, `- ${this.config.command.description_short}`, AccessMode.ADD);

        let synopsis = document.createElement("h6");
        Util.setInnerText(synopsis, "Synopsis");

        let synopsisContent = document.createElement("p");
        Util.setInnerText(synopsisContent, this.config.command.synopsis);

        let description = document.createElement("h6");
        Util.setInnerText(description, "Description");

        let descriptionContent = document.createElement("p");
        Util.setInnerText(descriptionContent, this.config.command.description);

        let examples = document.createElement("h6");
        Util.setInnerText(examples, "Examples");

        let examplesContent = document.createElement("p");
        Util.setInnerText(descriptionContent, this.config.command.examples);

        content.append(contentHeader, name, nameContent, synopsis, synopsisContent, description, descriptionContent, examples, examplesContent);
        
        if (this.config.command.options) {
            let options = document.createElement("h6");
            Util.setInnerText(name, "Options");

            let optionsContent = document.createElement("p");
            Util.setInnerText(optionsContent, this.config.command.options);

            content.append(options, optionsContent);
        }

        return container;
    }
}

export { Help }