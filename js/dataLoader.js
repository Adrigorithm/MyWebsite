"use strict"

import { RequestMethod, ResponseType } from "./enums.js";

class DataLoader {
    static async GetAsyncData(path, method, responseType, body, headers) {
        if (!path)
            return (null, "No url or path specified");

        let response = null;

        try {
            response = await fetch(path, {
                method: method ? method : RequestMethod.NONE,
                body: body ? body : undefined,
                headers: headers ? headers : undefined,
            })
        } catch (error) {
            return (null, "Something went wrong");
        }

        switch (response.status) {
            case 200:
            case 201:
                switch (responseType) {
                    case ResponseType.NONE:
                    case ResponseType.JSON:
                        return await response.json();
                    case ResponseType.TEXT:
                        return await response.text();
                    case ResponseType.BLOB:
                        return await response.blob();
                    case ResponseType.BYTES: // This may not work
                        return await response.bytes();
                    case ResponseType.FORM_DATA:
                        return await response.formData();
                    case ResponseType.ARRAY_BUFFER:
                        return await response.arrayBuffer();
                    case ResponseType.CLONE:
                        return await response.clone();
                    default:
                        return await response.text();
                }
            case 400:
                return (400, "Malformed request");
            case 401:
                return (401, `Not authorised`);
            case 403:
                return (403, "Not authorised");
            case 404:
                return (404, "Not found");
            case 429:
                return (429, "Ratelimited");
            default:
                return (response.status, "Something went wrong");
        }
    }
}

export { DataLoader }