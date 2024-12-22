"use strict"

const RequestMethod = {
    NONE: "GET",
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE",
    CONNECT: "CONNECT",
    PATH: "PATH",
    TRACE: "TRACE",
    HEAD: "HEAD",
    OPTIONS: "OPTIONS"
};

const ResponseType = {
    NONE: 0,
    JSON: 0,
    TEXT: 1,
    BLOB: 2,
    BYTES: 3,
    FORM_DATA: 4,
    ARRAY_BUFFER: 5,
    CLONE: 6
};

const CommandType = {
    NONE: 0,
    HTML: 0,
    TEXT: 1,
    SUGGESTIONS: 2
};

const KeyCode = {
    ENTER: 13
};

const AccessMode = {
    READ: 0,
    ADD: 1,
    SET: 2
};

const LogLevel = {
    NONE: "LOG",
    INFO: "INFO",
    WARNING: "WARNING",
    ERROR: "ERROR"
};

export { RequestMethod, ResponseType, CommandType, KeyCode, AccessMode, LogLevel }