import { ExpiringArray } from "./expiringArray.js";

class ClickIndicator {
  #indicator;
  #indicatorCopies = new ExpiringArray(1100);

  constructor(indicator) {
    this.#indicator = indicator;

    this.initialise();
  }

  initialise() {
    document.body.addEventListener("click", (e) => {
      let indicatorCopy = this.#indicator.cloneNode(true);
      let topOffset = e.pageY - this.#indicator.clientHeight / 2;
      let leftOffset = e.pageX - this.#indicator.clientWidth / 2;

      indicatorCopy.style.top = `${topOffset}px`;
      indicatorCopy.style.left = `${leftOffset}px`;

      indicatorCopy.classList.remove("invisible");
      document.body.appendChild(indicatorCopy);
      console.info(
        "Meow :3, you clicked here:",
        indicatorCopy.getBoundingClientRect(),
      );

      indicatorCopy.style.fill = "transparent";
      indicatorCopy.children[0].style.stroke = "transparent";

      this.#indicatorCopies.push(indicatorCopy);
    });
  }
}

export { ClickIndicator };
