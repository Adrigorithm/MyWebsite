"use strict"

import { CertificateStatus, WriteMode } from "./enums.js";
import { SetTextContent } from "./utilities.js";

class CertificateCard {
    #certificates = [];

    constructor(certificates) {
        this.#certificates = certificates;
    }

    ToDOMElements(){
        let companyHashmap = new Set();
        let cardsContainer = document.createElement("section");

        for (let index = 0; index < this.#certificates.length; index++) {
            let element = this.#certificates[index];

            if (!companyHashmap.has(element.company)) {
                companyHashmap.add(element.company);

                let category = document.createElement("h2");
                category.classList.add("text-center");
                SetTextContent(category, WriteMode.APPEND, document.createTextNode(element.company));

                cardsContainer.appendChild(category);
            }

            let cardsContainerInner = document.createElement("section");
            cardsContainerInner.appendChild(element.ToDOMElement());

            cardsContainer.appendChild(cardsContainerInner);
        }

        return cardsContainer;
    }
}

class Certificate {
    image = null;
    reference = null;
    name = null;
    description = null;
    company = null;
    achievedDate = null;
    expirationDate = null;
    status = null;

    constructor(image, name, company, achievedDate, expirationDate = null, reference = null, description = null, status = CertificateStatus.COMPLETED) {
        this.image = image;
        this.reference = reference;
        this.name = name;
        this.description = description;
        this.company = company;
        this.achievedDate = achievedDate;
        this.expirationDate = expirationDate;
        this.status = status;
    }

    ToDOMElement(){
        let card = document.createElement("div");
        card.classList.add("flex", "flex-col", "items-center");

        let subtitle = document.createElement("h4");
        SetTextContent(subtitle, WriteMode.APPEND, document.createTextNode(this.name));

        let imageAnchor = document.createElement("a");
        imageAnchor.setAttribute("href", this.reference ?? "javascript:void(0)");
        imageAnchor.setAttribute("title", "opens my certificate (in a new tab)");
        imageAnchor.setAttribute("target", "_blank");

        let image = document.createElement("img");
        image.setAttribute("src", this.image);
        image.setAttribute("width", "150px");
        image.setAttribute("alt", `image of certificate: ${this.name}`);

        let validity = document.createElement("p");
        SetTextContent(validity, WriteMode.APPEND, document.createTextNode(this.expirationDate
            ? `Achieved on: ${this.achievedDate} - Valid until: ${this.expirationDate}`
            : `Achieved on: ${this.achievedDate} - Valid forever :)`));

        let footer = document.createElement("p");
        footer.classList.add("py-2", "w-full", "text-center");
        switch (this.status) {
            case CertificateStatus.COMPLETED:
            case CertificateStatus.COMPLETED_CAT:
            case CertificateStatus.COMPLETED_NL:
                footer.style.backgroundColor = "green";
                break;
            case CertificateStatus.IN_PROGRESS:
            case CertificateStatus.IN_PROGRESS_CAT:
            case CertificateStatus.IN_PROGRESS_NL:
                footer.style.backgroundColor = "yellow";
                footer.style.color = "black";
                break;
            case CertificateStatus.PLANNED:
            case CertificateStatus.PLANNED_CAT:
            case CertificateStatus.PLANNED_NL:
                footer.style.backgroundColor = "grey";
                break;
            default:
                footer.style.backgroundColor = "green";
        }
        SetTextContent(footer, WriteMode.APPEND, document.createTextNode(this.status));

        imageAnchor.appendChild(image);
        card.append(subtitle, imageAnchor, validity, footer);

        if (this.description) {
            let description = document.createElement("p");
            description.classList.add("px-2");
            SetTextContent(description, WriteMode.APPEND, document.createTextNode(this.description));

            card.insertBefore(description, footer);
        }

        return card;
    }
}

export { Certificate, CertificateCard }