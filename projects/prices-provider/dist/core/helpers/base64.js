"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeBase64 = exports.encodeBase64 = void 0;
const encodeBase64 = (str) => Buffer.from(str, "binary").toString("base64");
exports.encodeBase64 = encodeBase64;
const decodeBase64 = (str) => Buffer.from(str, "base64").toString("binary");
exports.decodeBase64 = decodeBase64;
