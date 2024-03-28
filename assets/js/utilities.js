"use strict"

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

function DateStringToDate(dateString) {
    let date = dateString.substring(0, 10);
    let dateFrags = date.split('-');

    return (`${dateFrags[2]} ${GetMonthByNumber(dateFrags[1])} ${dateFrags[0]}`);
}

function AddNodesToNode(node, nodesToAdd) {
    nodesToAdd.forEach(nodeToAdd => {
        node.appendChild(nodeToAdd);
    });
};

function GetMonthByNumber(monthNumber) {
    let monthString;

    switch (monthNumber) {
        case "01":
            monthString = "January";
            break;
        case "02":
            monthString = "February";
            break;
        case "03":
            monthString = "March";
            break;
        case "04":
            monthString = "April";
            break;
        case "05":
            monthString = "May";
            break;
        case "06":
            monthString = "June";
            break;
        case "07":
            monthString = "July";
            break;
        case "08":
            monthString = "August";
            break;
        case "09":
            monthString = "September";
            break;
        case "10":
            monthString = "October";
            break;
        case "11":
            monthString = "November";
            break;
        case "12":
            monthString = "December";
            break;
        default:
            monthString = "Unknown Month";
    }

    return monthString;
}

export { SetTextContent, DateStringToDate };
