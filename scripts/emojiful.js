class Emojiful {
  #emojifulContainer = undefined;
  #emojifulGenerate = undefined;
  #emojifulErrors = undefined;
  #translator = null;

  constructor(emojifulContainer, emojifulGenerate, emojifulErrors, translator) {
    this.#emojifulContainer = emojifulContainer;
    this.#emojifulGenerate = emojifulGenerate;
    this.#emojifulErrors = emojifulErrors;
    this.#translator = translator;

    emojifulGenerate.addEventListener("click", () => {

    });
  }


}

export { Emojiful };
