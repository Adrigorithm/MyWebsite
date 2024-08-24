"use strict"

class TimeLine {
    #motd = ["GNU/Linux > Windows", "I use Arch BTW", "I am docker container", "This uses JavaScript", "Powered by TailwindCSS", "Bootstrap sucks", "JS sucks flaccid c*ck"];
    #timeLineFrames = [];
    #activeFrame = -1;

    constructor(timeLineFrames) {
        this.#timeLineFrames = timeLineFrames;
        this.#activeFrame = timeLineFrames.length;
    };

    ToDOMElements() {
        let timeLines = [];

        for (let index = 0; index < this.#timeLineFrames.length; index++) {
            let container = document.createElement("div");
            container.classList.add("w-full", "lg:flex", "lg:flex-row");
            if (index + 1 != this.#activeFrame) {
                container.classList.add("!hidden");
            }

            // Image part of the timeline frame
            let imageContainer = document.createElement("div");
            imageContainer.classList.add("flex", "flex-col", "bg-contain", "basis-full", "lg:basis-1/3", "bg-lightSteelBlue", "dark:bg-transPink", "bg-no-repeat", "bg-cover", "bg-center", "h-80", "justify-between", `bg-[url('${this.#timeLineFrames[index].image}')]`);
            imageContainer.setAttribute("alt", `Image of ${this.#timeLineFrames[index].name}`);

            let nameContainer = document.createElement("div");
            nameContainer.classList.add("w-full", "text-center", "opacity-80", "bg-nightBlack");

            let name = document.createElement("p");
            name.classList.add("text-transWhite", "p-2", "m-0");
            name.appendChild(document.createTextNode(`${this.#timeLineFrames[index].name}`));

            let placeContainer = document.createElement("div");
            placeContainer.classList.add("w-full", "text-center", "opacity-80", "bg-nightBlack");

            let place = document.createElement("p");
            place.classList.add("text-transWhite", "p-2", "m-0")
            place.appendChild(document.createTextNode(`${this.#timeLineFrames[index].place}`));

            nameContainer.appendChild(name);
            placeContainer.appendChild(place);

            imageContainer.append(nameContainer, placeContainer);

            // Description part of the timeline frame
            let textContainer = document.createElement("div");
            textContainer.classList.add("mx-2", "lg:basis-2/3");

            let titleContainer = document.createElement("div");
            titleContainer.classList.add("flex", "flex-row", "items-center")

            let title = document.createElement("h4");

            let titleImage = document.createElement("img");
            titleImage.classList.add("h-6");
            titleImage.setAttribute("src", "/assets/img/right.svg");
            titleImage.setAttribute("alt", "subTitleIndicator");

            let descImage = document.createElement("p");
            descImage.appendChild(document.createTextNode(`${this.#timeLineFrames[index].text}`));

            titleContainer.appendChild(titleImage);

            titleContainer.appendChild(title);
            title.appendChild(document.createTextNode(` ${this.#timeLineFrames[index].header}`));

            textContainer.append(titleContainer, descImage);

            // Merging components
            container.append(imageContainer, textContainer);

            if (index == 0) {
                // Navigation part of the timeline frame
                let navContainer = document.createElement("div");
                navContainer.classList.add("flex", "flex-row", "items-center", "justify-center", "w-full");

                let navButtonLeft = document.createElement("a");
                navButtonLeft.setAttribute("href", "javascript: void(0);");

                let lChevronDouble = document.createElement("img");
                lChevronDouble.classList.add("h-6");
                lChevronDouble.setAttribute("src", "/assets/img/leftDouble.svg");
                lChevronDouble.setAttribute("alt", "previousSlideIndicator");

                let motd = document.createElement("p");
                motd.classList.add("p-2");
                motd.appendChild(document.createTextNode(`${this.#motd[Math.floor(Math.random() * this.#motd.length)]}`));

                let navButtonRight = document.createElement("a");
                navButtonRight.setAttribute("href", "javascript: void(0);");

                let rChevronDouble = document.createElement("img");
                rChevronDouble.classList.add("h-6");
                rChevronDouble.setAttribute("src", "/assets/img/rightDouble.svg");
                rChevronDouble.setAttribute("alt", "nextSlideIndicator");

                navButtonLeft.appendChild(lChevronDouble);
                navButtonRight.appendChild(rChevronDouble);

                // Active frame swapping
                navButtonLeft.addEventListener("click", () => {
                    this.ActiveItemChange(container.parentElement, false);
                })

                navButtonRight.addEventListener("click", () => {
                    this.ActiveItemChange(container.parentElement, true);
                })

                navContainer.append(navButtonLeft, motd, navButtonRight);

                timeLines.push(navContainer);
            }

            timeLines.push(container);
        }

        return timeLines;
    };

    ActiveItemChange(container, next){
        if (next && this.#activeFrame + 1 <= this.#timeLineFrames.length) {
            container.children[this.#activeFrame].classList.add("!hidden");
            this.#activeFrame++;
            container.children[this.#activeFrame].classList.remove("!hidden");
        } else if (!next && this.#activeFrame - 1 > 0) {
            container.children[this.#activeFrame].classList.add("!hidden");
            this.#activeFrame--;
            container.children[this.#activeFrame].classList.remove("!hidden");
        }
    }
};

class TimeLineFrame {
    constructor(header, image, name, place, text) {
        this.header = header;
        this.image = image;
        this.name = name;
        this.place = place;
        this.text = text;
    };
};

export {TimeLineFrame, TimeLine};
