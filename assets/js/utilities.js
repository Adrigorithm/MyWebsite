"use strict"

import { Language } from "./enums.js";
import { NotImplementedException } from "./exceptions.js";

function SetTextContent(nodeToWriteTo, writeMode, ...contentNodes) {
    if (writeMode == "SET") {
        nodeToWriteTo.replaceChildren();
        AddNodesToNode(nodeToWriteTo, contentNodes);
    } else if (writeMode == "APPEND") {
        AddNodesToNode(nodeToWriteTo, contentNodes);
    } else {
        throw new NotImplementedException(`${writeMode} is not a supported mode, use the WriteMode class.`);
    }
};

function DateStringToDate(dateString, language) {
    let date = dateString.substring(0, 10);
    let dateFrags = date.split('-');

    return (`${dateFrags[2]} ${GetMonthByNumber(dateFrags[1], language)} ${dateFrags[0]}`);
}

function AddNodesToNode(node, nodesToAdd) {
    nodesToAdd.forEach(nodeToAdd => {
        node.appendChild(nodeToAdd);
    });
};

function GetMonthByNumber(monthNumber, language) {
    let months = [
        ["January", "Januari", "Gener"],
        ["February", "Februari", "Febrer"],
        ["March", "Maart", "Març"],
        ["April", "April", "Abril"],
        ["May", "Mei", "Maig"],
        ["June", "Juni", "Juny"],
        ["July", "Juli", "Juliol"],
        ["August", "Augustus", "Agost"],
        ["September", "September", "Setembre"],
        ["October", "Oktober", "Octubre"],
        ["November", "November", "Novembre"],
        ["December", "December", "Desembre"]
    ];

    switch (language) {
        case Language.CATALAN:
            return months[monthNumber - 1][2];
        case Language.DUTCH:
            return months[monthNumber - 1][1];
        default:
            return months[monthNumber - 1][0];
    }
}

export { SetTextContent, DateStringToDate };
