"use strict"

// Components (YOUR IDE WILL COMPLAIN - THIS IS NORMAL - DO NOT REMOVE UNUSED IMPORTS)
import { Suggestions } from "./components/suggestions.js";

import { CaseInsensitiveMap } from "./caseInsensitiveMap.js";
import { DataLoader } from "./dataLoader.js";
import { KeyCode, RequestMethod, ResponseType } from "./enums.js";
import { FilePaths } from "./statics.js";
import { Util } from "./utilities.js";

class Shell {
    #commands = new CaseInsensitiveMap();
    #prompt = undefined;
    #history = undefined;

    constructor(commandsFilePath, textInputField, submitCommandButton, historyContainer) {
        DataLoader.GetAsyncData(commandsFilePath ??= FilePaths.COMMANDS, RequestMethod.GET, ResponseType.JSON).then((data) => {
            if (textInputField.tagName == "INPUT") {
                this.#prompt = textInputField;
                this.#prompt.addEventListener("input", (caller) => {
                    this.suggestCommands(caller);
                });
                this.#prompt.addEventListener("keyup", (caller) => {
                    if (caller.keyCode == KeyCode.ENTER)
                        this.executeCommand(caller.target.value);
                });
                submitCommandButton.addEventListener("click", (event) => {
                    this.executeCommand(caller.target.value);
                    event.preventDefault();
                })
            } else {
                console.error(`The WebTerminal cannot work without an <input> element as prompt. Expected, <input>, but was <${textInputField.tagName}>`);
            }

            if (historyContainer) {
                this.#history = historyContainer;
            } else {
                console.error("The WebTerminal cannot work without a container element to direct stdout to.");
            }

            this.addCommands(data.commands);
        })
    }

    addCommands(commands) {
        if (!commands || !(commands instanceof Array))
            return;

        commands.forEach(c => this.#commands.set(c.name, c));
    }

    suggestCommands(caller) {
        let commands = this.#commands.match(caller.target.value);
        this.executeCommand(null);
    }

    executeCommand(commandName) {
        let command = this.#commands.get(commandName);
        let result = this.createInstance(command);

        this.#history.appendChild(result.toHTML());
    }

    createInstance(config) {
        const constructor = eval(config 
            ? Util.capitalise(config.name)
            : "Suggestions");
        return new constructor(config);
    }


}

export { Shell };