import { downloadZip } from "./client-zip.js";

class Emojiful {
  #emojifulContainer = undefined;
  #emojifulGenerate = undefined;
  #emojifulErrors = undefined;
  #emojifulDatapackGenerator = undefined;
  #overlay = undefined;
  #translator = null;
  #emojiDomList = undefined;
  #packMcmetaStr = '{"pack":{"pack_format":6,"description":"Emojiful emojis!"}}';

  constructor(emojifulContainer, emojifulGenerate, emojifulErrors, emojifulDatapackGenerator, overlay, translator) {
    this.#emojifulContainer = emojifulContainer;
    this.#emojifulGenerate = emojifulGenerate;
    this.#emojifulErrors = emojifulErrors;
    this.#emojifulDatapackGenerator = emojifulDatapackGenerator;
    this.#overlay = overlay;
    this.#translator = translator;
    this.#emojiDomList = emojifulDatapackGenerator.getElementsByClassName("emojis")[0];

    emojifulGenerate.addEventListener("click", () => {
      emojifulGenerate.disabled = true;
      this.processHtml(emojifulContainer.value);
      this.#overlay.classList.remove("hidden");
      this.#emojifulDatapackGenerator.classList.remove("hidden");
      emojifulGenerate.disabled = false;
    });

    emojifulDatapackGenerator.children[2].children[0].addEventListener("click", () => {
      this.setAllButtonsActive();
    });

    emojifulDatapackGenerator.children[2].children[1].addEventListener("click", () => {
      this.setAllButtonsInactive();
    });

    emojifulDatapackGenerator.children[2].children[2].addEventListener("click", () => {
      const category = this.#emojifulDatapackGenerator.children[1].children[1].value || "category";
      const recipeDir = this.#emojifulDatapackGenerator.children[1].children[2].value;

      this.zipActiveEmoji(recipeDir, category);
    });

    emojifulDatapackGenerator.children[2].children[3].addEventListener("click", () => {
      emojifulDatapackGenerator.classList.add("hidden");
      overlay.classList.add("hidden");
    });
  }

  processHtml(htmlString) {
    let html = new DOMParser().parseFromString(htmlString, "text/html");
    let emojisImg = html.querySelectorAll("button > img"); // There are guild icon images too so this is necessary

    for (const img of emojisImg) {
      let button = this.generateEmojiHtml(img);

      button.addEventListener("click", () => {
        this.toggleActive(button);
      })

      this.#emojiDomList.appendChild(button);
    }
  }

  toggleActive(button) {
    if (button.children[1].classList.length === 0)
      this.setButtonActive(button)
    else
    this.setButtonInactive(button)
  }

  setAllButtonsActive() {
    for (const emojiButton of this.#emojiDomList.children) {
      if (emojiButton.children[1].classList.length === 0)
        this.setButtonActive(emojiButton);
    }
  }

  setAllButtonsInactive() {
    for (const emojiButton of this.#emojiDomList.children) {
      if (emojiButton.children[1].classList.length > 0)
        this.setButtonInactive(emojiButton);
    }
  }

  getAllActiveEmojiImgs() {
    let emojiImgs = [];

    for (const emojiButton of this.#emojiDomList.children) {
      if (emojiButton.children[1].classList.length > 0)
        emojiImgs.push(emojiButton.children[0]);
    }

    return emojiImgs;
  }

  async zipActiveEmoji(recipeDir, category) {
    let emojis = this.getAllActiveEmojiImgs();

    if (emojis.length === 0)
      return;

    let emojiFiles = [];

    emojis.forEach((emoji) => {
      emojiFiles.push(this.generateEmojiJsonFile(recipeDir, category, emoji));
    })

    const response = downloadZip([this.generatePackMcmetaFile(), ...emojiFiles]);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `emojiful-${category}-datapack.zip`;
    a.click();

    URL.revokeObjectURL(url);
  }

  generateEmojiJsonFile(recipeDir, category, img) {
    return {
      name: `data/emojiful/${recipeDir}/${img.alt}.json`,
      input: JSON.stringify(this.generateEmojiJson(category, img))
    };
  }

  generatePackMcmetaFile() {
    return {
      name: "pack.mcmeta",
      input: this.#packMcmetaStr
    };
  }

  generateEmojiJson(category, img) {
    return {
      category: category,
      name: img.alt,
      url: img.src.substring(0, img.src.indexOf("?")),
      type: "emojiful:emoji_recipe"
    };
  }

  setButtonActive(button) {
    button.children[1].classList = ["bg-green-300 dark:bg-green-700"];
  }

  setButtonInactive(button) {
    button.children[1].classList = [];
  }

  generateEmojiHtml(imageElement) {
    let button = document.createElement("button");
    button.classList.add("flex", "flex-col", "justify-between");

    let img = document.createElement("img");
    img.src = imageElement.src;
    img.alt = imageElement.alt.substring(1, imageElement.alt.length - 1);

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
