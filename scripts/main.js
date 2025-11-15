import { AssetLoader } from "./assetLoader.js";
import { ClickIndicator } from "./clickIndicator.js";
import { Configurator } from "./configurator.js";
import { Router } from "./router.js";
import { ToastSpawner } from "./toastSpawner.js";
import { Translator } from "./translator.js";

document.addEventListener("DOMContentLoaded", load);

let router = undefined;
let assetsLoader = undefined;
let clickIndicator = undefined;
let translator = undefined;
let configurator = undefined;
let activeLanguageButton = undefined;
let toastSpawner = undefined;

setupTranslator();

function load() {
  setupRouter();
  setupAssetsLoader();
  setupClickIndicator();
  setupConfigurator();
  setupActiveLanguageButton();
  setupToastSpawner();

  applyDependencies();
  applyDynamicText();
}

function setupRouter() {
  let navbar = document.getElementById("nav-main");
  let navControls = document.getElementsByClassName("navControl");
  let contents = document.getElementsByClassName("page");

  router = new Router(navbar, navControls, contents);

  router.setup();
  router.navigate(null, location.hash.substring(1));
}

function setupAssetsLoader() {
  let images = document.querySelectorAll("img[data-image]");

  assetsLoader = new AssetLoader(images);
}

function setupClickIndicator() {
  let paw = document.getElementById("clickIndicator");

  clickIndicator = new ClickIndicator(paw);
}

function setupTranslator() {
  translator = new Translator();

  translator.initialTranslate();
}

function setupConfigurator() {
  let configuratorElement = document.getElementById("configurator");
  let activateOnClickElements = document.getElementsByClassName("openConfig");

  configurator = new Configurator(
    configuratorElement,
    activateOnClickElements,
    translator,
  );
}

function setupActiveLanguageButton() {
  activeLanguageButton = document.getElementById("activeLanguage");
  configurator.setActiveLanguageButton(activeLanguageButton);
  configurator.updateActiveLanguageButton();
}

function setupToastSpawner() {
  toastSpawner = new ToastSpawner();
}

function applyDependencies() {
  configurator.setToastSpawner(toastSpawner);
}

function applyDynamicText() {
  let textNodes = document.getElementsByClassName("age");

  for (const node of textNodes) node.textContent = getAge();
}

function getAge() {
  let birth = Temporal.PlainDate.from("1998-12-04");
  let now = Temporal.Now.plainDateISO();

  return birth.until(now, { largestUnit: "years" }).years;
}
