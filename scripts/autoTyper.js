class AutoTyper {
    #configurations = [];
    #isActive = true;

    constructor(autoTyperConfigurations) {
        this.#configurations = autoTyperConfigurations;
    }

    // Async to allow the use of this.sleep()
    async execute(configuration) {
        while (this.#isActive) {
            configuration.textNode.innerHTML = configuration.getActiveSubString();

            configuration.next();

            if (configuration.invertMode)
                await this.sleep(configuration.invertDelay);
            else
                await this.sleep(configuration.delayMin + Math.floor(Math.random() * configuration.delayMax));
        }
    }

    // Call before this.executeAll() to indicate the first word is displayed initially (like in html)
    preload() {
        this.#configurations.at(0).enableInvert();
    }

    stopAll() {
        this.#isActive = false;
    }

    // Should only be used once this.executeAll() has been called at least once.
    startAll() {
        this.#isActive = true;
    }

    executeAll() {
        for (let configuration of this.#configurations) {
            void this.execute(configuration);
        }
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

export { AutoTyper };