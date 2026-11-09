import { downloadZip } from "./client-zip.js";

class Emojiful {
  #emojifulDatapackGenerator = undefined;
  #overlay = undefined;
  #emojiDomList = undefined;
  #packMcmetaStr = '{"pack":{"pack_format":6,"description":"Emojiful emojis!"}}';

  constructor(emojifulContainer, emojifulGenerate, emojifulDatapackGenerator, overlay) {
    this.#emojifulDatapackGenerator = emojifulDatapackGenerator;
    this.#overlay = overlay;
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
      const category = this.#emojifulDatapackGenerator.children[1].children[2].value || "category";
      const recipeDir = this.#emojifulDatapackGenerator.children[1].children[3].value;

      this.zipActiveEmoji(recipeDir, category);
    });

    for (const button of emojifulDatapackGenerator.getElementsByClassName("closeEmojiful")) {
      button.addEventListener("click", () => {
        this.close();
      });
    }
  }

  close() {
    this.#emojifulDatapackGenerator.classList.add("hidden");
    this.#overlay.classList.add("hidden");
  }

  processHtml(htmlString) {
    let html = new DOMParser().parseFromString(htmlString, "text/html");
    let emojisImg = html.querySelectorAll("button > img"); // There are guild icon images too so this is necessary

    for (const img of emojisImg) {
      if (!img.alt)
        continue;

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

  ensureFileNameValid(fileName) {
    let fileNameSanitised = "";

    for (let i = 0; i < fileName.length; i++) {
      const currentCharCode = fileName.charCodeAt(i);
      let char = fileName[i];

      // Most likely (small latin char)
      if (currentCharCode > 96 && currentCharCode < 123) {
        fileNameSanitised += char;
        continue;
      }

      // capital latin char
      if (currentCharCode > 64 && currentCharCode < 91) {
        fileNameSanitised += char.toLowerCase();
        continue;
      }

      // digit
      if (currentCharCode > 47 && currentCharCode < 58) {
        fileNameSanitised += char;
        continue;
      }

      // . - _
      if (currentCharCode == 46 || currentCharCode == 45 || currentCharCode == 95) {
        fileNameSanitised += char;
        continue;
      }

      // Least likely (unsupported char)
      fileNameSanitised += '-';
    }

    return fileNameSanitised;
  }

  generateEmojiJsonFile(recipeDir, category, img) {
    "".toLowerCase()
    return {
      name: `data/emojiful/${recipeDir}/${this.ensureFileNameValid(img.alt)}.json`,
      input: JSON.stringify(this.generateEmojiJson(category, img))
    };
  }

  generatePackMcmetaFile() {
    return {
      name: "pack.mcmeta",
      input: this.#packMcmetaStr
    };
  }

  generateEmojifulCompatibleUrl(url) {
    let matches = url.match(/animated=([^&]+)/);
    let isAnimated = matches && matches[matches.length - 1] === "true";

    return url.replace(".webp", isAnimated ? ".gif" : ".png");
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
    img.src = this.generateEmojifulCompatibleUrl(imageElement.src);
    img.alt = imageElement.alt.substring(1, imageElement.alt.length - 1);

    let span = document.createElement("span");
    span.classList = ["bg-green-300 dark:bg-green-700"];

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
