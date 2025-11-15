class Router {
  #navbar;
  #navbarControls;
  #contents;

  #isNavbarFirstShow = true;

  constructor(navbar, navbarControls, contents) {
    this.#navbar = navbar;
    this.#navbarControls = navbarControls;
    this.#contents = contents;
  }

  setup() {
    this.closeNavbar();

    let headerHeight = document.getElementsByTagName("header")[0].clientHeight;
    this.#navbar.style.top = `${headerHeight}px`;

    this.#navbarControls[0].addEventListener("click", () => {
      if (this.#isNavbarFirstShow) {
        let navbarNav = this.#navbar.parentElement;

        navbarNav.classList.remove("invisible");
        navbarNav.classList.add("transition-margin-left");

        this.#isNavbarFirstShow = false;
      }

      this.openNavbar();

      this.#navbarControls[0].classList.add("hidden");
      this.#navbarControls[1].classList.remove("hidden");
    });

    this.#navbarControls[1].addEventListener("click", () => {
      this.closeNavbar();

      this.#navbarControls[0].classList.remove("hidden");
      this.#navbarControls[1].classList.add("hidden");
    });

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
      let a = li.getElementsByTagName("a")[0];
      let aHash = a.hash.substring(1);

      if (aHash == newId) {
        a.classList.add("font-bold");
        li.classList.add("border-r");
      } else if (aHash == oldId) {
        a.classList.remove("font-bold");
        li.classList.remove("border-r");
      }
    }

    for (const main of this.#contents) {
      if (main.id == newId) main.classList.remove("hidden");
      else if (main.id == oldId) main.classList.add("hidden");
    }
  }
}

export { Router };
