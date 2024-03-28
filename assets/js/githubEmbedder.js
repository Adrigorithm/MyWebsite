import { WriteMode } from "./enums.js";
import { DateStringToDate, SetTextContent } from "./utilities.js";

class GithubEmbedder{
    static fromPublicRepoJSON(json){
        let container = document.createElement("div");
        let summary = document.createElement("div");
        let extended = document.createElement("div");
        let titleLink = document.createElement("a");
        let title = document.createElement("h3");
        let ownerLink = document.createElement("a");
        let owner = document.createElement("h4");
        let ownerPrefix = document.createElement("span");
        let description = document.createElement("p");
        let updated = document.createElement("p");

        let titleText = document.createTextNode(json.name);
        let ownerText = document.createTextNode(json.owner.login);
        let ownerPrefixText = document.createTextNode("created by ");
        let descriptionText = document.createTextNode(json.description);
        let updatedText = document.createTextNode(`Last updated at ${DateStringToDate(json.pushed_at)}`);

        titleLink.setAttribute("href", json.html_url);
        titleLink.setAttribute("target", "_blank");
        ownerLink.setAttribute("href", json.owner.html_url);
        ownerLink.setAttribute("target", "_blank");

        SetTextContent(description, WriteMode.SET, descriptionText);
        SetTextContent(updated, WriteMode.SET, updatedText);
        SetTextContent(title, WriteMode.SET, titleText);
        SetTextContent(ownerPrefix, WriteMode.SET, ownerPrefixText);
        owner.appendChild(ownerPrefix);
        SetTextContent(owner, WriteMode.APPEND, ownerText);

        titleLink.appendChild(title);
        ownerLink.appendChild(owner);
        summary.append(titleLink, ownerLink);
        extended.append(description, updated);
        container.append(summary, extended);

        return container;
    }
}

export {GithubEmbedder};