"use strict"

// Components (YOUR IDE WILL COMPLAIN - THIS IS NORMAL - DO NOT REMOVE UNUSED IMPORTS)
import { Suggestions } from "./components/suggestions.js";

import { CaseInsensitiveMap } from "./caseInsensitiveMap.js";
import { DataLoader } from "./dataLoader.js";
import { KeyCode, RequestMethod, ResponseType } from "./enums.js";
import { FilePaths } from "./statics.js";
import { Util } from "./utilities.js";
import { Logger } from "./logger.js";

class Shell {
    #commands = undefined;
    #prompt = undefined;
    #history = undefined;
    #logger = undefined;

    constructor(commandsFilePath, textInputField, submitCommandButton, historyContainer) {
        this.#logger = new Logger();
        this.#commands = new CaseInsensitiveMap(this.#logger);

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
                this.#logger.error(`The WebTerminal cannot work without an <input> element as prompt. Expected, <input>, but was <${textInputField.tagName}>`, true);
            }

            if (historyContainer) {
                this.#history = historyContainer;
            } else {
                this.#logger.error("The WebTerminal cannot work without a container element to direct stdout to.");
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
        this.removeSuggestionsDuplicate();
        let commandNameElements = this.#commands.match(caller.target.value);
        
        if (commandNameElements.length > 0)
            this.executeCommand("suggestions", {
                name: "suggestions",
                htmlData: commandNameElements
            });
    }

    executeCommand(commandName, config) {
        let command = this.#commands.get(commandName);

        if (!command) {
            this.#logger.error(`Command: ${commandName} not found`, true);
            return;
        }
            
        let result = this.createInstance(command, config);

        this.#history.appendChild(result.toHTML());

        this.#logger.info(`Command: ${result.constructor.name} executed`, true);
    }

    createInstance(command, config) {
        const constructor = eval(Util.capitalise(command.name));

        return new constructor(config);
    }

    removeSuggestionsDuplicate() {
        if (this.#history.children.length == 0)
            return;

        let lastCommand = this.#history.lastChild;

        if (lastCommand.querySelector("legend").textContent == "suggestions")
            lastCommand.remove();
    }
}

export { Shell };