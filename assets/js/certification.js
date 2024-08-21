"use strict"

class CertificationCard {
    #certifications = [];
    constructor(certifications) {
        this.#certifications = certifications;
    }
}

class Certification {
    image = null;
    reference = null;
    name = null;
    description = null;
    company = null;
    achievedDate = null;
    expirationDate = null;

    constructor(image, name, company, achievedDate, expirationDate = null, reference = null, description = null) {
        this.image = image;
        this.reference = reference;
        this.name = name;
        this.description = description;
        this.company = company;
        this.achievedDate = achievedDate;
        this.expirationDate = expirationDate;
    }
}