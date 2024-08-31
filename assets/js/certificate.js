"use strict"

import { CertificateStatus, Language, WriteMode } from "./enums.js";
import { SetTextContent } from "./utilities.js";

class CertificateCard {
    #certificates = new Map();

    constructor(certificates, language) {
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
        let keyIterator = this.#certificates.keys();
        let key = keyIterator.next();

        while (key.value){
            let company = key.value;
            let category = document.createElement("h3");
            category.classList.add("text-center");
            SetTextContent(category, WriteMode.APPEND, document.createTextNode(company));

            let cardsContainerInner = document.createElement("section");
            cardsContainerInner.classList.add("flex", "flex-col", "md:flex-row", "justify-center");

            this.#certificates.get(company).forEach(certificate => {
                cardsContainerInner.appendChild(certificate.ToDOMElement());
            });

            cardsContainer.append(category, cardsContainerInner);

            key = keyIterator.next();
        }

        return cardsContainer;
    }
}

class Certificate {
    #currentLanguage = Language.NONE;
    image = null;
    reference = null;
    name = null;
    description = null;
    company = null;
    achievedDate = null;
    expirationDate = null;
    status = null;

    constructor(language, image, name, company, achievedDate, expirationDate = null, reference = null, description = null, status = CertificateStatus.COMPLETED) {
        this.#currentLanguage = language;
        this.image = image;
        this.reference = reference;
        this.name = name;
        this.description = description;
        this.company = company;
        this.achievedDate = achievedDate;
        this.expirationDate = expirationDate;
        this.status = status;
    }

    OpenCertificateString(){
        switch (this.#currentLanguage) {
            case Language.CATALAN:
                return "obre el meu certificat (en una pestanya nova)";
            case Language.DUTCH:
                return "opent mijn certificaat (in een nieuwe tab)";
            default:
                return "opens my certificate (in a new tab)";
        }
    }

    CertificateValidityRangeString(){
        switch (this.#currentLanguage) {
            case Language.CATALAN:
                return this.expirationDate
                    ? `Aconseguit el: ${this.achievedDate} - Vàlid fins a: ${this.expirationDate}`
                    : `Aconseguit el: ${this.achievedDate} - Vàlid per sempre`;
            case Language.DUTCH:
                return this.expirationDate
                    ? `Behaald op: ${this.achievedDate} - Geldig tot: ${this.expirationDate}`
                    : `Behaald op: ${this.achievedDate} - Voor altijd geldig :)`;
            default:
                return this.expirationDate
                    ? `Achieved on: ${this.achievedDate} - Valid until: ${this.expirationDate}`
                    : `Achieved on: ${this.achievedDate} - Valid forever :)`;
        }
    }

    ToDOMElement(){
        let card = document.createElement("div");
        card.classList.add("flex", "flex-col", "items-center");

        let subtitle = document.createElement("h4");
        SetTextContent(subtitle, WriteMode.APPEND, document.createTextNode(this.name));

        let imageAnchor = document.createElement("a");
        imageAnchor.setAttribute("href", this.reference ?? "https://youtu.be/Y5NTgZA-xWE?t=18");
        imageAnchor.setAttribute("title", this.OpenCertificateString());
        imageAnchor.setAttribute("target", "_blank");

        let image = document.createElement("img");
        image.setAttribute("src", this.image);
        image.setAttribute("width", "150px");
        image.setAttribute("height", "150px");
        image.setAttribute("alt", this.name);

        let validity = document.createElement("p");
        SetTextContent(validity, WriteMode.APPEND, document.createTextNode(this.CertificateValidityRangeString()));

        let footer = document.createElement("p");
        footer.classList.add("py-2", "w-full", "text-center");
        switch (this.status) {
            case CertificateStatus.COMPLETED:
            case CertificateStatus.COMPLETED_CAT:
            case CertificateStatus.COMPLETED_NL:
                footer.style.backgroundColor = "darkgreen";
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
                footer.style.backgroundColor = "dimgrey";
                break;
            default:
                footer.style.backgroundColor = "darkgreen";
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