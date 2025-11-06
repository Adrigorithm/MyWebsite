class ExpiringArray extends Array {
  #ttlMs;

  constructor(ttlMs) {
    super();

    this.#ttlMs = ttlMs;
  }

  push(item) {
    super.push(item);

    setTimeout(() => {
      let element = super.shift();

      element.parentNode.removeChild(element);
    }, this.#ttlMs);
  }
}

export { ExpiringArray };
