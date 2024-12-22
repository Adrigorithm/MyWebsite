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
}

export { Util };