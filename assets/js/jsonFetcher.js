"use strict"

import { FetchError } from "./exceptions.js";

class DataLoader{
    async FetchData(path, requestMethod, contentType, payLoad = null) {
        const response = await fetch(path, {
            method: requestMethod,
            headers: {
                "Content-Type": contentType
            },
            body: payLoad
        });

        if (!response.ok) {
            message = "";
            httpError = response.status;
            
            if (httpError < 500) {
                switch (httpError) {
                    case 400:
                        message = "Malformed request syntax, please verify your request parameters";
                        break;
                    case 401:
                    case 403:
                        message = "You are not permitted to request this resource";
                        break;
                    case 404:
                        message = "Requested resource does not exist";
                    case 429:
                        message = "Cockblocked, stop spamming requests";
                    default:
                        message = "Unknown error occured, probably on your end";
                        break;
                }
            } else if (httpError < 600) {
                switch (httpError) {
                    case 500:
                        message = "The server had a brain freeze";
                        break;
                    default:
                        message = "Unknown error occured, you may want to report this to the developer"
                        break;
                }
            }

            throw new FetchError(message, httpError);
        }
        
        return response.json();
    };
};

export {DataLoader};
