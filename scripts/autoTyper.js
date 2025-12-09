class AutoTyper {
    #configurations = [];
    #isActive = true;

    constructor(autoTyperConfigurations) {
        this.#configurations = autoTyperConfigurations;
    }

    // Async to allow the use of this.sleep()
    async execute(configuration) {
        while (this.#isActive) {
            if (configuration.invertMode) {
                let delay = configuration.isLetterIndexWordLength()
                    ? 1000
                    : configuration.invertDelay;

                await this.sleep(delay);
            }
            else
                await this.sleep(configuration.delayMin + Math.floor(Math.random() * configuration.delayMax));

            configuration.next();
            configuration.textNode.innerHTML = configuration.getActiveSubString();
        }
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
