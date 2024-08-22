"use strict"

const WriteMode = {
    SET: "SET",
    APPEND: "APPEND"
};

const RequestMethod = {
    GET: "GET",
    POST: "POST"
};

const ContentType = {
    JSON: "application/json"
};

const OvenMode = {
    TRADITIONAL: "/assets/img/ovenTraditional.svg",
    FAN: "/assets/img/ovenVent.svg",
    FAN_TRADITIONAL: "/assets/ovenVentTraditional"
};

const Temperature = {
    CELCIUS: 'C',
    FAHRENHEIT: 'F',
    KELVIN: 'K'
};

const Language = {
    ENGLISH: "en_gb",
    DUTCH: "nl_be",
    CATALAN: "cat",
    NONE: "en_gb"
};

const CertificateStatus = {
    COMPLETED: "Completed!",
    COMPLETED_CAT: "Completat!",
    COMPLETED_NL: "Voltooid!",
    IN_PROGRESS: "In progress...",
    IN_PROGRESS_CAT: "En progrés...",
    IN_PROGRESS_NL: "In uitvoering...",
    PLANNED: "Planned",
    PLANNED_CAT: "Planificat",
    PLANNED_NL: "Gepland"
}

export {WriteMode, RequestMethod, ContentType, OvenMode, Temperature, Language, CertificateStatus};
