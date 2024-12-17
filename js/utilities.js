"use strict"

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
}

export { Util };