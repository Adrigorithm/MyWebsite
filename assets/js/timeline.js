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
            imageContainer.classList.add("flex", "flex-col", "w-full", "h-[426px]", "lg:max-w-[639px]", "bg-center", "bg-lightSteelBlue", "dark:bg-mediumPurple", "bg-no-repeat", "justify-between", `bg-[url('${this.#timeLineFrames[index].image}')]`);
            imageContainer.setAttribute("alt", `Image of ${this.#timeLineFrames[index].name}`);

            let nameContainer = document.createElement("div");
            nameContainer.classList.add("w-full", "text-center", "opacity-50", "bg-black");

            let name = document.createElement("p");
            name.classList.add("text-white", "p-2", "m-0");
            name.appendChild(document.createTextNode(`${this.#timeLineFrames[index].name}`));

            let placeContainer = document.createElement("div");
            placeContainer.classList.add("w-full", "text-center", "opacity-50", "bg-black");

            let place = document.createElement("p");
            place.classList.add("text-white", "p-2", "m-0")
            place.appendChild(document.createTextNode(`${this.#timeLineFrames[index].place}`));

            nameContainer.appendChild(name);
            placeContainer.appendChild(place);

            imageContainer.append(nameContainer, placeContainer);

            // Description part of the timeline frame
            let textContainer = document.createElement("div");
            textContainer.classList.add("mx-2");

            let titleContainer = document.createElement("h4");

            let titleImageContainer = document.createElement("span");

            let titleImage = document.createElement("img");
            titleImage.classList.add("h-4");
            titleImage.setAttribute("src", "/assets/img/rChevron.svg");
            titleImage.setAttribute("alt", "subTitleIndicator");

            let descImage = document.createElement("p");
            descImage.appendChild(document.createTextNode(`${this.#timeLineFrames[index].text}`));

            titleImageContainer.appendChild(titleImage);

            titleContainer.appendChild(titleImageContainer);
            titleContainer.appendChild(document.createTextNode(` ${this.#timeLineFrames[index].header}`));

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
                lChevronDouble.setAttribute("src", "/assets/img/lChevronDouble.svg");
                lChevronDouble.setAttribute("alt", "previousSlideIndicator");

                let motd = document.createElement("p");
                motd.classList.add("p-2");
                motd.appendChild(document.createTextNode(`${this.#motd[Math.floor(Math.random() * this.#motd.length)]}`));

                let navButtonRight = document.createElement("a");
                navButtonRight.setAttribute("href", "javascript: void(0);");

                let rChevronDouble = document.createElement("img");
                rChevronDouble.classList.add("h-6");
                rChevronDouble.setAttribute("src", "/assets/img/rChevronDouble.svg");
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
