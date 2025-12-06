class AutoTyperConfiguration {
    words = [];
    delay_min = 250; // ms
    delay_max = 750; // ms
    currentWordIndex = 0;
    letterIndex = 0;
    invertMode = false;
    textNode;

    constructor(words, delay_min, delay_max, textNode) {
        this.words = words;
        this.delay_min = delay_min;
        this.delay_max = delay_max;
        this.textNode = textNode;
    }

    next() {
        if (this.invertMode) {
            this.letterIndex -= 1;

            if (this.letterIndex === 0) {
                this.letterIndex = 0;
                this.invertMode = false;
                this.nextWord();
            }
        } else {
            this.letterIndex += 1;
            let currentWord = this.words[this.currentWordIndex];

            if (this.letterIndex > currentWord.length) {
                this.letterIndex -= 2;
                this.invertMode = true;
            }
        }
    }

    enableInvert() {
        this.letterIndex = this.words[this.currentWordIndex].length;
    }

    nextWord() {
        this.currentWordIndex += 1;

        if (this.currentWordIndex >= this.words.length)
            this.currentWordIndex = 0;
    }

    getActiveSubString() {
        return this.words[this.currentWordIndex].substring(0, this.letterIndex);
    }
}

export { AutoTyperConfiguration };
