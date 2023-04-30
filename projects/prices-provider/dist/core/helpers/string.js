"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.equalsIgnoreCase = exports.normalizeString = exports.removeDiacritics = void 0;
/**
 * Return the input value without diacritics
 * https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript
 * @param value
 */
function removeDiacritics(value) {
    return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
exports.removeDiacritics = removeDiacritics;
function normalizeString(value) {
    return removeDiacritics(value.toLowerCase());
}
exports.normalizeString = normalizeString;
function equalsIgnoreCase(first, second) {
    return first.toLowerCase() === second.toLowerCase();
}
exports.equalsIgnoreCase = equalsIgnoreCase;
