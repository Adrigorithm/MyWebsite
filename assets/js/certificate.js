"use strict"

import { CertificateStatus, WriteMode } from "./enums.js";
import { SetTextContent } from "./utilities.js";

class CertificateCard {
    #certificates = new Map();

    constructor(certificates) {
        certificates.forEach(certificate => {
            if (!this.#certificates.has(certificate.company)) {
                this.#certificates.set(certificate.company, [certificate]);
            } else {
                this.#certificates.get(certificate.company).push(certificate);
            }
        });
    }

    ToDOMElements(){
        let cardsContainer = document.createElement("section");

        this.#certificates.keys().forEach(company => {
            let category = document.createElement("h2");
            category.classList.add("text-center");
            SetTextContent(category, WriteMode.APPEND, document.createTextNode(company));

            let cardsContainerInner = document.createElement("section");
            cardsContainerInner.classList.add("flex", "flex-col", "md:flex-row", "justify-center");

            this.#certificates.get(company).forEach(certificate => {
                cardsContainerInner.appendChild(certificate.ToDOMElement());
            });

            cardsContainer.append(category, cardsContainerInner);
        });

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
                footer.style.color = "lab(9 0 0)";
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