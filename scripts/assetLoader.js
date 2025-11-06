class AssetLoader {
  #images;

  constructor(images) {
    this.#images = images;

    this.loadAssets();
  }

  loadAssets() {
    this.#images.forEach((image) => (image.src = image.dataset.image));
  }
}

export { AssetLoader };
