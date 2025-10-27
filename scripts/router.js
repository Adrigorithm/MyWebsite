class Router {
  #navbar;
  #contents;

  constructor(navbar, contents) {
    this.#navbar = navbar;
    this.#contents = contents;
  }

  setup() {
    for (const li of this.#navbar.children) {
      let button = li.getElementsByTagName("button")[0];

      if (button) {
        button.addEventListener("click", () => {
          location.hash = button.value;
        });
      }
    }

    window.addEventListener("hashchange", (e) => {
      this.navigate(
        e.oldURL.substring(e.oldURL.lastIndexOf("/") + 2),
        e.newURL.substring(e.newURL.lastIndexOf("/") + 2),
      );
    });
  }

  navigate(oldId, newId) {
    this.updateStyles(oldId ?? newId, newId);
  }

  updateStyles(oldId, newId) {
    for (const li of this.#navbar.children) {
      let button = li.getElementsByTagName("button")[0];
      let buttonValue = button?.value;

      if (buttonValue == newId) button.classList.add("bold");
      else if (buttonValue == oldId) button.classList.remove("bold");
    }

    for (const main of this.#contents) {
      if (main.id == newId) main.classList.remove("hidden");
      else if (main.id == oldId) main.classList.add("hidden");
    }
  }
}

export { Router };
