"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmpty = exports.isNotEmpty = exports.isValidEmailAddress = exports.isNullEqualOrLowerThan = exports.isNullOrLowerThan = exports.isEqualOrLowerThan = exports.isLowerThan = exports.isNullEqualOrGreaterThan = exports.isNullOrGreaterThan = exports.isEqualOrGreaterThan = exports.isGreaterThan = exports.isPositiveNumber = exports.isValidInteger = exports.isValorized = exports.isSpecialKey = exports.isValidNumber = exports.isValidDigit = exports.isNumeric = void 0;
/** Checks if v is a valid numeric value */
function isNumeric(v) {
    return !["", " ", true, false, null].includes(v) && !isNaN(Number(v));
}
exports.isNumeric = isNumeric;
/** Checks if v is a valid digit */
function isValidDigit(key, allowDot = false) {
    key = String(key);
    return key.length === 1 && !!key.match(allowDot ? "[0-9]|\\." : "[0-9]");
}
exports.isValidDigit = isValidDigit;
/** Checks if v is a valid number */
function isValidNumber(key, allowDot = false, decimalPlaces = 2) {
    const validationRegex = allowDot ? `^[0-9]*[.]{0,1}[0-9]{0,${decimalPlaces}}$` : "^[0-9]*$";
    return !!String(key).match(validationRegex);
}
exports.isValidNumber = isValidNumber;
/** Checks if key is one of the special keys listed below */
function isSpecialKey(key) {
    return [
        "Tab",
        "Backspace",
        "Delete",
        "ArrowLeft",
        "ArrowDown",
        "ArrowRight",
        "ArrowUp",
        "Enter",
        "Home",
        "End",
    ].includes(key);
}
exports.isSpecialKey = isSpecialKey;
/** Checks if v is a string with length > 0, a number or a boolean */
function isValorized(v) {
    return !["", null, undefined].includes(v) && String(v).trim().length > 0;
}
exports.isValorized = isValorized;
/** Checks if v is a valid integer number */
function isValidInteger(v) {
    return v.length > 0 && Number.isInteger(Number(v));
}
exports.isValidInteger = isValidInteger;
/** Checks if v is a valid positive number */
function isPositiveNumber(v) {
    return v >= 0;
}
exports.isPositiveNumber = isPositiveNumber;
/** Checks if v is greater than min (both required) */
function isGreaterThan(v, min) {
    return v > min;
}
exports.isGreaterThan = isGreaterThan;
/** Checks if v is equal or greater than min (both required) */
function isEqualOrGreaterThan(v, min) {
    return v >= min;
}
exports.isEqualOrGreaterThan = isEqualOrGreaterThan;
/** Checks if v is null or greater than min (both nullable) */
function isNullOrGreaterThan(v, min) {
    if (v === null || min === null) {
        return true;
    }
    return v > min;
}
exports.isNullOrGreaterThan = isNullOrGreaterThan;
/** Checks if v is null, equal or greater than min (both nullable) */
function isNullEqualOrGreaterThan(v, min) {
    if (v === null || min === null) {
        return true;
    }
    return v >= min;
}
exports.isNullEqualOrGreaterThan = isNullEqualOrGreaterThan;
/** Checks if v is lower than max (both required) */
function isLowerThan(v, max) {
    return v < max;
}
exports.isLowerThan = isLowerThan;
/** Checks if v is equal or lower than max (both required) */
function isEqualOrLowerThan(v, max) {
    return v <= max;
}
exports.isEqualOrLowerThan = isEqualOrLowerThan;
/** Checks if v is null or lower than max (both nullable) */
function isNullOrLowerThan(v, max) {
    if (v === null || max === null) {
        return true;
    }
    return v < max;
}
exports.isNullOrLowerThan = isNullOrLowerThan;
/**Checks if v is null, equal or lower than max (both nullable) */
function isNullEqualOrLowerThan(v, max) {
    if (v === null || max === null) {
        return true;
    }
    return v <= max;
}
exports.isNullEqualOrLowerThan = isNullEqualOrLowerThan;
/** Validate if the input value is a valid email address */
function isValidEmailAddress(v) {
    return !!v.match("^(([^<>()\\[\\]\\\\.,;:\\s@\"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$");
}
exports.isValidEmailAddress = isValidEmailAddress;
function isNotEmpty(v) {
    return !!v && v.length > 0;
}
exports.isNotEmpty = isNotEmpty;
function isEmpty(v) {
    return !!v && v.length === 0;
}
exports.isEmpty = isEmpty;
