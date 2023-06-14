"use strict"

import { NotImplementedException } from "./exceptions.js";

function SetTextContent(nodeToWriteTo, writeMode, ... contentNodes) {
    if (writeMode == "SET") {
        nodeToWriteTo.replaceChildren();
        AddNodesToNode(nodeToWriteTo, contentNodes);
    }else if (writeMode == "APPEND") {
        AddNodesToNode(nodeToWriteTo, contentNodes);
    }else{
        throw new NotImplementedException(`${writeMode} is not a supported mode, use the WriteMode class.`);
    }
};

function AddNodesToNode(node, nodesToAdd) {
    nodesToAdd.forEach(nodeToAdd => {
        node.appendChild(nodeToAdd);
    });
};

export {SetTextContent};
