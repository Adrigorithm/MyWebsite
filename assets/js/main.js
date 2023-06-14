"use strict"

import { DataLoader } from "./jsonFetcher.js";
import { ContentType, RequestMethod } from "./enums.js";
import { ScrollButtonController } from "./scrollEvents.js";
import { TimeLine, TimeLineFrame } from "./timeline.js";

window.addEventListener("load", PageLoaded);

let scrollTopButton;

function PageLoaded() {
    SetupScrollEvent();
    ConstructTimeLines();
}

function SetupScrollEvent(){
    scrollTopButton = new ScrollButtonController(
        document.getElementById("mainNav"),
        document.getElementById("toTopButton")
    );

    window.addEventListener("scroll", () => {
        scrollTopButton.CalculateVisibilityCheck(
            window.scrollY,
            document.getElementById("mainNav")
        )
    });
}

function ConstructTimeLines(){
    let timeLinesHtml = document.getElementsByClassName("timeline");
    let dataLoader = new DataLoader();
    let timeLines = [];

    dataLoader.FetchData("/assets/json/timelines.json", RequestMethod.GET, ContentType.JSON).then((data) => {
        let timeLinesData = data.timelines;

        if (timeLinesData.length != timeLinesHtml.length) {
            console.log("Some timeline data could not be loaded or is missing.");
        };

        for (let index = 0; index < timeLinesHtml.length; index++) {
            let timeLineFrames = [];

            for (let index0 = 0; index0 < timeLinesData[index].details.length; index0++) {
                timeLineFrames.push(new TimeLineFrame(
                    timeLinesData[index].details[index0].header,
                    timeLinesData[index].details[index0].image,
                    timeLinesData[index].details[index0].name,
                    timeLinesData[index].details[index0].place,
                    timeLinesData[index].details[index0].text
                ));
            }

            timeLines.push(new TimeLine(timeLineFrames));
            timeLines[index].ToDOMElements().forEach(element => {
                timeLinesHtml[index].appendChild(element);
            });
        };
    });

    // let timeLinesHtml = document.getElementsByClassName("timeline");

    // for (let index = 0; index < timelines.length; index++) {
    //     timelines[index].children[0].children[1].innerHTML = motd[Math.floor(Math.random() * motd.length)];

    //     timesCurrent.push(timelines[index].children.length - 1);

    //     timelines[index].children[0].children[0].onclick = function () {
    //         timelineClickEventHandler(index, false);
    //     }
    //     timelines[index].children[0].children[2].onclick = function () {
    //         timelineClickEventHandler(index, true);
    //     }
    // }
}