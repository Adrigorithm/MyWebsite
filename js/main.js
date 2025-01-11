"use strict"

import { Shell } from "./shell.js";
import { FilePaths } from "./statics.js";

window.addEventListener("load", onLoad);

let shell;

function onLoad() {
    shell = new Shell(document.getElementById("prompt"), document.getElementById("submitCmdButton"), document.getElementById("history"));
}