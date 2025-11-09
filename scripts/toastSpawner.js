import { LogLevel } from "./enums.js";
import { ExpiringArray } from "./expiringArray.js";

class ToastSpawner {
  #toasts;
  #footerHeight;

  constructor() {
    this.#toasts = new ExpiringArray(4000);

    this.initialise();
  }

  initialise() {
    this.#footerHeight =
      document.getElementsByTagName("footer")[0].clientHeight;
  }

  spawn(message, logLevel) {
    let toast = document.createElement("div");
    let paragraph = document.createElement("p");
    let text = document.createTextNode(message);

    paragraph.appendChild(text);
    paragraph.classList.add("p-1.5", "relative");
    toast.appendChild(paragraph);
    toast.classList.add(
      "mb-3",
      "right-0",
      "fixed",
      "duration-500",
      "transition-margin-right",
    );

    toast.style.bottom = `${this.#footerHeight}px`;

    switch (logLevel) {
      case LogLevel.Success:
        paragraph.classList.add("bg-green-300", "dark:bg-green-700");
        paragraph.classList.add("text-gray-800", "dark:text-gray-300");
        break;
      default:
        return;
    }

    document.body.prepend(toast);
    this.#toasts.push(toast);

    setTimeout(() => {
      let toastWidth = toast.clientWidth;

      toast.style.marginRight = `-${toastWidth}px`;
    }, 3000);
  }
}

export { ToastSpawner };
