"use strict"

class Component {
    config = null;

    constructor(config) {
        this.config = config;
    }

    toHTML() {
        let container = document.createElement("fieldset");
        
        let title = document.createElement("legend");

        return container;
    }
}

export { Component }