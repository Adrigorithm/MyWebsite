class Emojiful {
  #emojifulContainer = undefined;
  #emojifulGenerate = undefined;
  #emojifulErrors = undefined;
  #emojifulDatapackGenerator = undefined;
  #overlay = undefined;
  #translator = null;

  constructor(emojifulContainer, emojifulGenerate, emojifulErrors, emojifulDatapackGenerator, overlay, translator) {
    this.#emojifulContainer = emojifulContainer;
    this.#emojifulGenerate = emojifulGenerate;
    this.#emojifulErrors = emojifulErrors;
    this.#emojifulDatapackGenerator = emojifulDatapackGenerator;
    this.#overlay = overlay;
    this.#translator = translator;

    emojifulGenerate.addEventListener("click", () => {
      emojifulGenerate.disabled = true;
      this.processHtml(emojifulContainer.value);
      this.#overlay.classList.remove("hidden");
      this.#emojifulDatapackGenerator.classList.remove("hidden");
      emojifulGenerate.disabled = false;
    });
  }

  processHtml(htmlString) {
    let html = new DOMParser().parseFromString(htmlString, "text/html");
    let emojisImg = html.querySelectorAll("button > img"); // There are guild icon images too so this is necessary

    for (const img of emojisImg) {
      let button = this.generateEmojiHtml(img);

      this.#emojifulDatapackGenerator.getElementsByClassName("emojis")[0].appendChild(button);
    }
  }

  generateEmojiHtml(imageElement) {
    let button = document.createElement("button");
    button.classList.add("flex", "flex-col");

    let img = document.createElement("img");
    img.src = imageElement.src;
    img.alt = imageElement.alt;

    let span = document.createElement("span");

    let spanSpan = document.createElement("span");
    spanSpan.classList.add("filter-background")

    let spanSpanText = document.createTextNode("✔️");

    spanSpan.appendChild(spanSpanText);
    span.appendChild(spanSpan);
    button.append(img, span);

    return button;
  }
}

export { Emojiful };
