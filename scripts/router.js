class Router {
  #navbar;
  #navbarControls;
  #contents;

  constructor(navbar, navbarControls, contents) {
    this.#navbar = navbar;
    this.#navbarControls = navbarControls;
    this.#contents = contents;
  }

  setup() {
    this.closeNavbar();

    this.#navbarControls[0].addEventListener("click", () => {
      this.openNavbar();

      this.#navbarControls[0].classList.add("hidden");
      this.#navbarControls[1].classList.remove("hidden");
    });

    this.#navbarControls[1].addEventListener("click", () => {
      this.closeNavbar();

      this.#navbarControls[0].classList.remove("hidden");
      this.#navbarControls[1].classList.add("hidden");
    });

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

  closeNavbar() {
    let navbarNav = this.#navbar.parentElement;
    navbarNav.style.marginLeft = `-${navbarNav.clientWidth}px`;
  }

  openNavbar() {
    let navbarNav = this.#navbar.parentElement;
    navbarNav.style.marginLeft = 0;
  }

  navigate(oldId, newId) {
    this.updateStyles(oldId ?? newId, newId);
  }

  updateStyles(oldId, newId) {
    for (const li of this.#navbar.children) {
      let button = li.getElementsByTagName("button")[0];
      let buttonValue = button?.value;

      if (buttonValue == newId) button.classList.add("font-bold");
      else if (buttonValue == oldId) button.classList.remove("font-bold");
    }

    for (const main of this.#contents) {
      if (main.id == newId) main.classList.remove("hidden");
      else if (main.id == oldId) main.classList.add("hidden");
    }
  }
}

export { Router };
