import { AssetLoader } from "./assetLoader.js";
import { ClickIndicator } from "./clickIndicator.js";
import { Configurator } from "./configurator.js";
import { Router } from "./router.js";
import { ToastSpawner } from "./toastSpawner.js";
import { Translator } from "./translator.js";
import { AutoTyper } from "./autoTyper.js";
import { AutoTyperConfiguration } from "./autoTyperConfiguration.js";
import { Slider } from "./slider.js";
import { SectionSwitcher } from "./sectionSwitcher.js";

document.addEventListener("DOMContentLoaded", load);

let router = undefined;
let assetsLoader = undefined;
let clickIndicator = undefined;
let translator = undefined;
let configurator = undefined;
let activeLanguageButton = undefined;
let autoTyper = undefined;
let toastSpawner = undefined;
let sectionSwitcher = undefined;
let slidersServices = [];

setupTranslator();

function load() {
  setupRouter();
  setupAssetsLoader();
  setupClickIndicator();
  setupConfigurator();
  setupActiveLanguageButton();
  setupAutoTyper();
  setupToastSpawner();
  setupSectionSwitcher();
  setupSliders();

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

function setupAutoTyper() {
  let elements = document.getElementsByClassName("autoTyper");

  autoTyper = new AutoTyper([
    new AutoTyperConfiguration(
      ["softwareEngineer", "catCuddler", "cloudEngineer", "pentester"],
      translator,
      100,
      300,
      50,
      getAutoTyperElement(elements, "IDs"),
    ),
  ]);

  autoTyper.executeAll();
}

function getAutoTyperElement(elements, dataName) {
  for (const element of elements) {
    if (element.dataset.name === dataName) return element;
  }

  return null;
}

function setupToastSpawner() {
  toastSpawner = new ToastSpawner(translator);
}

function setupSectionSwitcher() {
  let aboutPage = document.getElementById("about");
  let switcher = aboutPage.getElementsByTagName("nav")[0];
  let sections = aboutPage.getElementsByTagName("section");

  sectionSwitcher = new SectionSwitcher(switcher, sections, []);
}

function setupSliders() {
  const sliders = document.getElementsByClassName("slider");

  for (let i = 0; i < sliders.length; i++) {
    const sliderElement = sliders.item(i);
    const sliderElementDataId = sliderElement.dataset.slider;
    const slider = new Slider(
      sliderElement,
      document.getElementById(`${sliderElementDataId}-previous`),
      document.getElementById(`${sliderElementDataId}-next`),
      document.getElementById(`${sliderElementDataId}-indicator`),
    );

    slider.setup();

    slidersServices.push(new Slider(slider));
  }
}

function applyDependencies() {
  configurator.setToastSpawner(toastSpawner);
}

function applyDynamicText() {
  let textNodes = document.getElementsByClassName("age");

  for (const node of textNodes) node.textContent = getAge();
}

function getAge() {
  let now = new Date();
  let birth = new Date("04-12-1998");
  let age = now.getFullYear() - birth.getFullYear();

  if (
    now.getMonth() < birth.getMonth() ||
    (now.getMonth() === birth.getMonth() && now.getDate() < birth.getDate())
  )
    age -= 1;

  return age.toString();

  // let birth = Temporal.PlainDate.from("1998-12-04");
  // let now = Temporal.Now.plainDateISO();
  //
  // return birth.until(now, { largestUnit: "years" }).years;
}
