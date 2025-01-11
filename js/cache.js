"use strict";

import { CaseInsensitiveMap } from "./caseInsensitiveMap.js";
import { DataLoader } from "./dataLoader.js";
import { RequestMethod, ResponseType } from "./enums.js";
import { FilePaths } from "./statics.js";

class Cache {
    static commands = new CaseInsensitiveMap();

    static setLogger(logger) {
        this.commands.setLogger(this.commands.setLogger(logger));
    }

    static initialiseCommands() {
        DataLoader.GetAsyncData(FilePaths.COMMANDS, RequestMethod.GET, ResponseType.JSON).then((data) => {
            this.#addCommands(data.commands);
        })
    }

    static #addCommands(loadedCommands) {
        if (!loadedCommands || !(loadedCommands instanceof Array))
            return;

        loadedCommands.forEach(c => this.commands.set(c.name, c));
    }
}

export { Cache };