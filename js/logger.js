"use strict"

import { LogLevel } from "./enums.js"
import { Util } from "./utilities.js";

class Logger {
    #logs = []

    log(logConfig, show) {
        this.#logs.push(logConfig);

        if (show)
            this.showLog(logConfig);
    }

    info(message, show) {
        this.log(new LogConfig(LogLevel.INFO, message), show);
    }

    warn(message, show) {
        this.log(new LogConfig(LogLevel.WARNING, message), show);
    }

    error(message, show) {
        this.log(new LogConfig(LogLevel.ERROR, message), show);
    }

    showLog(logConfig) {
        let dateTime = document.createElement("span");
        dateTime.style.backgroundColor = "black";
        dateTime.style.color = "white";
        Util.setInnerText(dateTime, );

        let error = document.createElement("span");
        switch (logConfig.logLevel) {
            case LogLevel.WARNING:
                error.style.backgroundColor = "yellow";
                error.style.color = "black";
                break;
            case LogLevel.ERROR:
                error.style.backgroundColor = "red";
                error.style.color = "white";
                break;
            default:
                error.style.backgroundColor = "grey";
                error.style.color = "white";
                break;
        }
        Util.setInnerText(dateTime, logConfig.logLevel);

        let message = document.createElement("span");
        Util.setInnerText(message, logConfig.message);

        let logLevelColour = this.logLevelBfFgColourString(logConfig.logLevel);

        if (logConfig.objects.length == 0)
            console.log(
                `%c ${logConfig.timestamp.toUTCString()} %c ${logConfig.logLevel} `, 
                `color: white; background-color: black`, 
                `color: ${logLevelColour[1]}; background-color: ${logLevelColour[0]}`, 
                logConfig.message);
        else
            console.log(
                `%c ${logConfig.timestamp.toUTCString()} %c ${logConfig.logLevel} `, 
                `color: white; background-color: black`, 
                `color: ${logLevelColour[1]}; background-color: ${logLevelColour[0]}`, 
                logConfig.message, logConfig.objects);
    }

    logLevelBfFgColourString(logLevel){
        switch (logLevel) {
            case LogLevel.ERROR:
                return ["red", "white"];
            case LogLevel.WARNING:
                return ["yellow", "black"];
            default:
                return ["white", "black"];
        }
    }
}

class LogConfig {
    logLevel = LogLevel.NONE;
    message = null;
    objects = [];
    timestamp = null;

    constructor(logLevel, message, ...objects) {
        this.logLevel = logLevel;
        this.message = message;
        this.objects = objects;
        this.timestamp = new Date();
    }
}

export { Logger };