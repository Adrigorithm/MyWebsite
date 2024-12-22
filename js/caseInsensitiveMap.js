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
     * Find values for keys that contain a specific string pattern.
     * @param {string} pattern String to find a match for
     * @returns The maching vlaues found for provided pattern if found, otherwise an empty array.
     */
    match(pattern) {
        pattern = pattern.toUpperCase();
        let values = [];
    
        for (const setKey of this.keys()) {
            if (setKey.toUpperCase().includes(pattern))
                values.push(super.get(setKey));
        }
        
        return values;
    }
}

export { CaseInsensitiveMap }