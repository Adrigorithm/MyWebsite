import { Router } from "./router.js";

document.addEventListener("DOMContentLoaded", load);

let router = undefined;

function load() {
  setupRouter();
}

function setupRouter() {
  let navbar = document.getElementById("nav-main");
  let navControls = document.getElementsByClassName("navControl");
  let contents = document.querySelectorAll("main section");

  router = new Router(navbar, navControls, contents);

  router.setup();
  router.navigate(null, location.hash.substring(1));
}
