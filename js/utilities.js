"use strict"

import { AccessMode } from "./enums.js";

class Util {
    /**
     * Ensures the first charater of a string is a capital charater
     * @param {string} str String to be transformed
     * @returns A capitalised string (or the original string)
     */
    static capitalise(str) {
        if (!str || str.trim().length == 0)
            return str;
        else 
            return str[0].toUpperCase() + str.substring(1);
    }

    /**
     * Returns a Boolean indicating whether the string is null or empty
     * @param {string} str String to check
     * @returns true if str is null or empty, otherwise false 
     */
    static isNullOrEmpty(str) {
        return !str || str.length == 0 /* Micro optimisation :3 */ || str.trim().length == 0;
    }

    static setInnerText(node, textToAdd, accessMode) {
        let textNode = document.createTextNode(textToAdd);

        switch (accessMode) {
            case AccessMode.ADD:
                node.appendChild(textNode);
                break;

            case AccessMode.SET:
            default:
                node.replaceChildren();
                node.appendChild(textNode);
                break;
        }
    }

    /**
     * Displays a TimeSpan in a human readable form, currently in ms and s.
     * @param {Number} ms time in milliseconds
     * @returns a string representing a TimeSpan 
     */
    static parseMs(ms) {
        if (ms < 1000)
            return `${ms}ms`

        let seconds = Number.parseInt(ms / 1000);

        return `${seconds}s ${ms - seconds * 1000}ms`;
    }
}

export { Util };