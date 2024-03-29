import { WriteMode } from "./enums.js";
import { DateStringToDate, SetTextContent } from "./utilities.js";

class GithubEmbedder{
    static fromPublicRepoJSON(json){
        let container = document.createElement("fieldset");
        let header = document.createElement("legend");
        let titleLink = document.createElement("a");
        let title = document.createElement("h3");
        let ownerLink = document.createElement("a");
        let owner = document.createElement("h4");
        let ownerPrefix = document.createElement("span");
        let description = document.createElement("p");
        let updated = document.createElement("p");

        let titleText = document.createTextNode(json.name);
        let legendText = document.createTextNode(json.name);
        let ownerText = document.createTextNode(json.owner.login);
        let ownerPrefixText = document.createTextNode("created by ");
        let descriptionText = document.createTextNode(json.description);
        let updatedText = document.createTextNode(`Last updated at ${DateStringToDate(json.pushed_at)}`);

        container.classList.add("border-solid", "border-2", "border-zaffre", "text-center", "m-2", "lg:w-full");
        titleLink.classList.add("no-underline", "text-black", "dark:text-white");
        ownerLink.classList.add("no-underline", "text-black", "dark:text-white");
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
        owner.appendChild(ownerPrefix);
        SetTextContent(owner, WriteMode.APPEND, ownerText);

        titleLink.appendChild(title);
        ownerLink.appendChild(owner);
        container.append(header, titleLink, ownerLink, description, updated);

        return container;
    }
}

export {GithubEmbedder};