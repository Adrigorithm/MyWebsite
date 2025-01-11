"use strict";

import { Cache } from "../cache.js";
import { AccessMode } from "../enums.js";
import { Util } from "../utilities.js";
import { Component } from "./shared/component.js";

class Help extends Component {
    constructor(config) {
        super(config);
    }

    toHTML() {
        const container = super.toHTML();
        let commandHelp = null;

        if (!this.config.params || !(this.config.params instanceof Array) || this.config.params.length == 0)
            commandHelp = Cache.commands.get("help");
        else {
            commandHelp = Cache.commands.get(this.config.params[0]);
            
            if (!commandHelp) {
                this.logInvalidParams(this.config.command.params[0].name);
                return;
            }
        }
        
        let content = container.querySelector(".commandHistoryContent");
        content.classList.add("flex", "flex-col");

        let contentHeader = document.createElement("div");
        contentHeader.classList.add("flex", "flex-row", "justify-between");

        let commandName = document.createElement("p");
        let commandName0 = document.createElement("p");

        Util.setInnerText(commandName, commandHelp.name);
        Util.setInnerText(commandName0, commandHelp.name);

        let title = document.createElement("h5");
        Util.setInnerText(title, "Adri's Command Manual");

        contentHeader.append(commandName, title, commandName0);

        let name = document.createElement("h6");
        name.classList.add("font-bold");
        Util.setInnerText(name, "Name");

        let nameContent = document.createElement("p");
        nameContent.classList.add("ml-4");
        Util.setInnerText(nameContent, commandHelp.name);
        if (commandHelp.description_short)
            Util.setInnerText(nameContent, `- ${commandHelp.description_short}`, AccessMode.ADD);

        let synopsis = document.createElement("h6");
        synopsis.classList.add("font-bold");
        Util.setInnerText(synopsis, "Synopsis");

        let synopsisContent = document.createElement("p");
        synopsisContent.classList.add("ml-4");
        Util.setInnerText(synopsisContent, commandHelp.synopsis);

        let description = document.createElement("h6");
        description.classList.add("font-bold");
        Util.setInnerText(description, "Description");

        let descriptionContent = document.createElement("p");
        descriptionContent.classList.add("ml-4");
        Util.setInnerText(descriptionContent, commandHelp.description);

        let examples = document.createElement("h6");
        examples.classList.add("font-bold");
        Util.setInnerText(examples, "Examples");

        let examplesContent = document.createElement("p");
        examplesContent.classList.add("ml-4");
        Util.setInnerText(descriptionContent, commandHelp.examples);

        content.append(contentHeader, name, nameContent, synopsis, synopsisContent, description, descriptionContent, examples, examplesContent);
        
        if (commandHelp.options) {
            let options = document.createElement("h6");
            options.classList.add("font-bold");
            Util.setInnerText(name, "Options");

            let optionsContent = document.createElement("p");
            optionsContent.classList.add("ml-4");
            Util.setInnerText(optionsContent, commandHelp.options);

            content.append(options, optionsContent);
        }

        return container;
    }
}

export { Help }