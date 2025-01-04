"use strict"

import { ServiceStatus } from "./enums.js";
import { Util } from "./utilities.js";

class Timer {
    #start = null;
    #end = null;

    start() {
        if (this.#start)
            return;

        this.#start = Date.now();
    }


    startUnsafe() {
        this.reset();
        this.start();
    }

    stop() {
        this.#end = Date.now();
    }

    /**
     * Get the elapsed time elapsed from when start was called until now or when stop was called.
     * @param {boolean} friendly in case a command takes a second or longer, display it in larger units with decimals
     */
    elapsed(friendly) {
        let stop = this.#end ??= Date.now();
        let elapsed = stop - this.#start;

        return friendly 
            ? Util.parseMs(elapsed)
            : `${elapsed}ms`;
    }

    status() {
        return this.#start && !this.#end
            ? ServiceStatus.RUNNING
            : ServiceStatus.IDLE;
    }

    reset() {
        this.#start = null;
        this.#end = null;
    }
}

export { Timer };