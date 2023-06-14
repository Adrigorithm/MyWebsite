"use strict"

var motd = [];
var timelines = document.getElementsByClassName("timeline");
var timesCurrent = [];

function init() {
    for (let index = 0; index < timelines.length; index++) {
        timelines[index].children[0].children[1].innerHTML = motd[Math.floor(Math.random() * motd.length)];

        timesCurrent.push(timelines[index].children.length - 1);

        timelines[index].children[0].children[0].onclick = function () {
            timelineClickEventHandler(index, false);
        }
        timelines[index].children[0].children[2].onclick = function () {
            timelineClickEventHandler(index, true);
        }
    }
}

init();

function timelineClickEventHandler(timeline, next) {
    timelines[timeline].children[timesCurrent[timeline]].classList.add("!hidden");

    if (next) {
        timesCurrent[timeline] = timesCurrent[timeline] + 1 == timelines[timeline].children.length ? 1 : timesCurrent[timeline] + 1;
    }else{
        timesCurrent[timeline] = timesCurrent[timeline] - 1 < 1 ? timelines[timeline].children.length - 1 : timesCurrent[timeline] - 1;
    }

    timelines[timeline].children[timesCurrent[timeline]].classList.remove("!hidden");
}
