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
    let classListSvg = [
      "bg-cosmic",
      "dark:bg-lilac",
      "fill-gray-300",
      "fill:text-gray-800",
    ];
    let classListText = [
      "bg-cosmic",
      "dark:bg-lilac",
      "text-gray-300",
      "dark:text-gray-800",
    ];

    for (const li of this.#navbar.children) {
      let a = li.getElementsByTagName("a")[0];
      let aHash = a.hash.substring(1);
      let classList = a.getElementsByTagName("svg")[0]
        ? classListSvg
        : classListText;

      if (aHash == newId) li.classList.add(...classList);
      else if (aHash == oldId) li.classList.remove(...classList);
    }

    for (const main of this.#contents) {
      if (main.id == newId) main.classList.remove("hidden");
      else if (main.id == oldId) main.classList.add("hidden");
    }
  }
}

export { Router };
