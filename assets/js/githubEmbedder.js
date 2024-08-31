import { Language, WriteMode } from "./enums.js";
import { DateStringToDate, SetTextContent } from "./utilities.js";

class GithubEmbedder{
    static CreatedByString(language){
        switch (language) {
            case Language.CATALAN:
                return "creat per ";
            case Language.DUTCH:
                return "gemaakt door ";
            default:
                return "created by ";
        }
    }

    static UpdatedOnString(language, date){
        switch (language) {
            case Language.CATALAN:
                return `Darrera actualització a ${date}`;
            case Language.DUTCH:
                return `Laatst bijgewerkt op ${date}`;
            default:
                return `Last updated on ${date}`;
        }
    }

    static fromPublicRepoJSON(json, language){
        let container = document.createElement("fieldset");
        let header = document.createElement("legend");
        let titleLink = document.createElement("a");
        let title = document.createElement("h3");
        let lineBreak = document.createElement("br");
        let ownerLink = document.createElement("a");
        let owner = document.createElement("h4");
        let ownerPrefix = document.createElement("h4");
        let description = document.createElement("p");
        let updated = document.createElement("p");

        let titleText = document.createTextNode(json.name);
        let legendText = document.createTextNode(json.name);
        let ownerText = document.createTextNode(json.owner.login);
        let ownerPrefixText = document.createTextNode(this.CreatedByString(language));
        let descriptionText = document.createTextNode(json.description);
        let updatedText = document.createTextNode(this.UpdatedOnString(language, DateStringToDate(json.pushed_at, language)));

        title.classList.add("inline");
        owner.classList.add("inline");
        ownerPrefix.classList.add("inline");
        container.classList.add("border-solid", "border-2", "border-fluoPink", "text-center", "m-2", "lg:w-full");
        titleLink.classList.add("no-underline", "text-nightBlack", "dark:text-transWhite");
        ownerLink.classList.add("no-underline", "text-nightBlack", "dark:text-transWhite");
        header.classList.add("text-bold");

        titleLink.setAttribute("href", json.html_url);
        titleLink.setAttribute("target", "_blank");
        ownerLink.setAttribute("href", json.owner.html_url);
        ownerLink.setAttribute("target", "_blank");

        SetTextContent(header, WriteMode.APPEND, legendText);
        SetTextContent(description, WriteMode.APPEND, descriptionText);
        SetTextContent(updated, WriteMode.APPEND, updatedText);
        SetTextContent(title, WriteMode.APPEND, titleText);
        SetTextContent(ownerPrefix, WriteMode.APPEND, ownerPrefixText);
        SetTextContent(owner, WriteMode.APPEND, ownerText);

        titleLink.appendChild(title);
        ownerLink.append(ownerPrefix, owner);
        container.append(header, titleLink, lineBreak, ownerLink, description, updated);

        return container;
    }
}

export {GithubEmbedder};