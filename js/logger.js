"use strict"

import { LogLevel } from "./enums.js"
import { Util } from "./utilities.js";

class Logger {
    #logs = []

    log(logConfig, show) {
        this.#logs.push(logConfig);

        if (show)
            showLog(logConfig);
    }

    static info(message, show) {
        this.log(new LogConfig(LogLevel.INFO, message), show);
    }

    static warn(message, show) {
        this.log(new LogConfig(LogLevel.WARNING, message), show);
    }

    static error(message, show) {
        this.log(new LogConfig(LogLevel.ERROR, message), show);
    }

    showLog(logConfig) {
        let dateTime = document.createElement("span");
        dateTime.style.backgroundColor = "black";
        dateTime.style.color = "white";
        Util.setInnerText(dateTime, logConfig.timestamp.toUTCString());

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

        if (logConfig.objects.length == 0)
            console.log(dateTime, error, message);
        else
        console.log(dateTime, error, message, logConfig.objects);
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
        this.timestamp = Date.now();
    }
}