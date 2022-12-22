var motd = ["GNU/Linux > Windows", "I use Arch BTW", "I am docker container", "This uses JavaScript", "Powered by TailwindCSS", "Bootstrap sucks", "JS sucks flaccid c*ck"];
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
