"use strict"

// Components (YOUR IDE WILL COMPLAIN - THIS IS NORMAL - DO NOT REMOVE UNUSED IMPORTS)
import { Suggestions } from "./components/suggestions.js";
import { Help } from "./components/help.js";

import { KeyCode, RequestMethod, ResponseType } from "./enums.js";
import { Util } from "./utilities.js";
import { Logger } from "./logger.js";
import { Timer } from "./timer.js";
import { Cache } from "./cache.js";

class Shell {
    #prompt = undefined;
    #history = undefined;
    #logger = undefined;
    #timer = undefined;

    constructor(textInputField, submitCommandButton, historyContainer) {
        this.#logger = new Logger();

        Cache.setLogger(this.#logger);
        Cache.initialiseCommands();

        this.#timer = new Timer();

        if (textInputField.tagName == "INPUT") {
            this.#prompt = textInputField;
            this.#prompt.addEventListener("input", (caller) => {
                this.#timer.startUnsafe();
                this.suggestCommands(caller);
            });
            this.#prompt.addEventListener("keyup", (caller) => {
                if (caller.keyCode == KeyCode.ENTER) {
                    this.#timer.startUnsafe();
                    this.executeCommand(caller.target.value);
                }
            });
            submitCommandButton.addEventListener("click", (event) => {
                this.#timer.startUnsafe();
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
    }

    addCommands(commands) {
        if (!commands || !(commands instanceof Array))
            return;

        commands.forEach(c => Cache.commands.set(c.name, c));
    }

    suggestCommands(caller) {
        this.removeSuggestionsDuplicate();
        let commandNameElements = Cache.commands.match(caller.target.value);
        
        if (commandNameElements.length > 0)
            this.executeCommandUnsafe("suggestions", [commandNameElements]);
    }

    executeCommandUnsafe(commandName, params) {
        let command = Cache.commands.get(commandName);

        if (!command) {
            this.#logger.error(`Command: ${commandName} not found`, true);
            return;
        }
            
        let result = this.createInstance(command, params);

        this.#history.appendChild(result.toHTML());

        this.#logger.info(`Command: ${result.constructor.name} executed, ${this.#timer.elapsed(true)} elapsed`, true);
    }

    executeCommand(params) {
        params = this.parseArguments(params);

        if (!params) {
            this.#logger.error(`Cannot parse command: no input found`, true);
            return;
        }

        this.executeCommandUnsafe(params[0], params.length > 1 
            ? params.slice(1)
            : null);
    }

    createInstance(command, params) {
        const constructor = eval(Util.capitalise(command.name));

        return new constructor({
            command: command,
            params: params
        });
    }

    removeSuggestionsDuplicate() {
        if (this.#history.children.length == 0)
            return;

        let lastCommand = this.#history.lastChild;

        if (lastCommand.querySelector("h4").textContent == "suggestions")
            lastCommand.remove();
    }

    parseArguments(inputStr) {
        if (Util.isNullOrEmpty(inputStr))
            return null;

        return inputStr.split(' ');
    }
}

export { Shell };