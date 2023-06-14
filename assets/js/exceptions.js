"use strict"

class NotImplementedException extends Error{
    constructor(message){
        super(message);
    }
};

class FetchError extends Error{
    constructor(message, httpCode){
        super(message);
        this.httpCode = httpCode;
    };
};

export {NotImplementedException, FetchError};
