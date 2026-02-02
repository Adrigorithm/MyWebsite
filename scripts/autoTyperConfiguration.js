class AutoTyperConfiguration {
  wordIds = [];
  wordsTranslated = [];
  translator = null;
  currentLang = null;
  delayMin = 250; // ms
  delayMax = 750; // ms
  invertDelay = 100; // ms
  currentWordIndex = 0;
  letterIndex = 0;
  invertMode = false;
  textNode = undefined;

  constructor(words, translator, delayMin, delayMax, invertDelay, textNode) {
    this.wordIds = words;
    this.translator = translator;
    this.delayMin = delayMin;
    this.delayMax = delayMax;
    this.invertDelay = invertDelay;
    this.textNode = textNode;

    this.translateWords();

    // In case a word is preloaded (displayed in HTML file) (this should ALWAYS be the first word in this.wordsTranslated), the AutoTyper is initially inverted.
    if (textNode.innerHTML.length > 0) {
      this.letterIndex = this.wordsTranslated[this.currentWordIndex].length;
      this.invertMode = true;
    }
  }

  isLetterIndexWordLength() {
    return (
      this.wordsTranslated[this.currentWordIndex].length === this.letterIndex
    );
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
      let currentWord = this.wordsTranslated[this.currentWordIndex];

      if (this.letterIndex === currentWord.length) {
        this.invertMode = true;
      }
    }

    this.translateWords();
  }

  translateWords() {
    let newLang = this.translator.getActiveLanguage();

    if (newLang === this.currentLang) return;

    this.currentLang = newLang;

    this.wordsTranslated = this.translator.translateAllWords(
      this.wordIds,
      newLang,
    );
  }

  enableInvert() {
    this.letterIndex = this.wordsTranslated[this.currentWordIndex].length;
  }

  nextWord() {
    this.currentWordIndex += 1;

    if (this.currentWordIndex >= this.wordsTranslated.length)
      this.currentWordIndex = 0;
  }

  getActiveSubString() {
    return this.wordsTranslated[this.currentWordIndex].substring(
      0,
      this.letterIndex,
    );
  }
}

export { AutoTyperConfiguration };
