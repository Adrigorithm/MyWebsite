"use strict"

import { Util } from "./utilities.js";

class CaseInsensitiveMap extends Map {
    #logger = undefined;

    constructor(logger) {
        super();

        this.#logger = logger;
    }

    /**
     * Adds a new element with a specified key and value to the Map if an element with the same (case-insensitive) key doesn't exist.
     * @param {string} key Unique case-insensitive id for a value
     * @param {*} value 
     * @returns a Boolean indicating whether the new value is set (and therefore if they key is unique)
     */
    set(key, value) {
        if (!value) {
            if (this.#logger)
                this.#logger.error(`Value for ${key} should not be missing or null.`, true);
            return false;
        }

        if (!key || key.trim().length == 0) {
            if (this.#logger)
                this.#logger.error(`Key for ${value} should not be missing or null.`, true);
            return false;
        }

        for (const setKey of this.keys()) {
            if (key.toUpperCase() == setKey.toUpperCase()) {
                if (this.#logger)
                    this.#logger.warn(`New KeyValuePair {${key}, ${value}} is not set because they key already exists (case-insensitive)`, true);
                return false;
            }
        }

        super.set(key, value);
        return true;
    }

    /**
     * 
     * @param {string} key Unique (but case-insensitive) id to search the value for
     * @returns The value found for provided key if found, otherwise null.
     */
    get(key) {
        if (Util.isNullOrEmpty(key))
            return null;

        key = key.toUpperCase();

        for (const setKey of this.keys()) {
            if (setKey.toUpperCase() == key)
                return super.get(setKey);
        }

        return null;
    }

    /**
     * Search the command repository to match by a command name, ignores case sensitivity
     * @param {string} pattern String to search for
     * @param {string} matchColour Colour to display the match in the command name in, inherit if not specified
     * @returns An array of matching command names as HTMLParagraphElements
     */
    match(pattern, matchColour) {
        const keys = this.keys();
        let query = pattern.toUpperCase();
        let matches = [];
        let k = keys.next().value;

        while (k) {
            let kUpperCase = k.toUpperCase();

            let stringP = document.createElement("p");
            let subString = "";
            let spanString = "";
            let queryIndex = 0;

            for (let i = 0; i < k.length; i++) {
                if (queryIndex < query.length && query.charAt(queryIndex) == kUpperCase[i]) {
                    let textNode = document.createTextNode(subString);
                    stringP.appendChild(textNode);

                    subString = "";
                    spanString += k[i];

                    queryIndex++;

                    continue;
                }

                if (spanString != "") {
                    let textNode = document.createTextNode(spanString);
                    let span = document.createElement("span");
                    span.setAttribute("style", `color: ${matchColour ? matchColour : "inherit"};`);
                    span.appendChild(textNode);
                    stringP.appendChild(span)

                    spanString = "";
                }

                subString += k[i];
            }

            if (spanString != "") {
                let textNode = document.createTextNode(spanString);
                let span = document.createElement("span");
                span.setAttribute("style", `color: ${matchColour ? matchColour : "inherit"};`);
                span.appendChild(textNode);
                stringP.appendChild(span)
            }

            let textNode = document.createTextNode(subString);
            stringP.appendChild(textNode);

            if (queryIndex == query.length)
                stringP.classList.add("sm:basis-1/3", "md:basis-1/4", "lg:basis-1/6", "justify-around", "text-center");
                matches.push(stringP);

            k = keys.next().value;
        }

        return matches;
    }
}

export { CaseInsensitiveMap }