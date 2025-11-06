class AssetLoader {
  #images;

  constructor(images) {
    this.#images = images;

    loadAssets();
  }

  loadAssets() {
    this.#images.forEach((image) => (image.src = image.dataset.image));
  }
}

export { AssetLoader };
