import { Router } from "./router.js";

document.addEventListener("DOMContentLoaded", load);

let router = undefined;

function load() {
  setupRouter();
}

function setupRouter() {
  let navbar = document.getElementById("nav-main");
  let contents = document.getElementsByTagName("main");

  router = new Router(navbar, contents);

  router.setup();
  router.navigate(null, location.hash.substring(1));
}
