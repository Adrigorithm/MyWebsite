class AutoTyperConfiguration {
    words = [];
    delayMin = 250; // ms
    delayMax = 750; // ms
    invertDelay = 100; // ms
    currentWordIndex = 0;
    letterIndex = 0;
    invertMode = false;
    textNode = undefined;

    constructor(words, delayMin, delayMax, invertDelay, textNode) {
        this.words = words;
        this.delayMin = delayMin;
        this.delayMax = delayMax;
        this.invertDelay = invertDelay;
        this.textNode = textNode;

        // In case a word is preloaded (displayed in HTML file) (this should ALWAYS be the first word in this.words), the AutoTyper is initially inverted.
        if (textNode.innerHTML.length > 0) {
            this.letterIndex = words[this.currentWordIndex].length;
            this.invertMode = true;
        }
    }

    isLetterIndexWordLength() {
        return this.words[this.currentWordIndex].length === this.letterIndex;
    }

    next() {
        if (this.invertMode) {
            this.letterIndex -= 1;

            if (this.letterIndex < 0) {
                this.invertMode = false;
                this.nextWord();
            }
        } else {
            this.letterIndex += 1;
            let currentWord = this.words[this.currentWordIndex];

            if (this.letterIndex === currentWord.length) {
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
