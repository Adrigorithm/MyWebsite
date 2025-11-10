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
    toast.classList.add("mb-3", "right-0", "fixed");

    let previousToast = this.#toasts[this.#toasts.length - 1];

    if (previousToast) {
      let previousToastHeight = previousToast.clientHeight;
      let previousToastBottom = previousToast.style.bottom;
      toast.style.bottom = `${previousToastHeight + parseInt(previousToastBottom.slice(0, -2)) + 12}px`;
    } else {
      toast.style.bottom = `${this.#footerHeight}px`;
    }

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

    let toastWidth = toast.clientWidth;
    toast.style.marginRight = `-${toastWidth}px`;

    console.info(
      "I made a toast for you nyu ^.^:",
      toast.getBoundingClientRect(),
    );

    toast.style.transition = "margin-right 300ms ease-in";
    toast.style.marginRight = 0;

    setTimeout(() => {
      toast.style.marginRight = `-${toastWidth}px`;
    }, 3000);
  }
}

export { ToastSpawner };
