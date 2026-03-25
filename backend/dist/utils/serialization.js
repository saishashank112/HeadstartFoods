"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serialize = void 0;
const serialize = (obj) => {
    return JSON.parse(JSON.stringify(obj, (key, value) => (typeof value === "bigint" ? value.toString() : value)));
};
exports.serialize = serialize;
