/** Checks if v is a valid numeric value */
export function isNumeric(v: any): boolean {
    return ![ "", " ", true, false, null ].includes(v) && !isNaN(Number(v));
}

/** Checks if v is a valid digit */
export function isValidDigit(key: string | number, allowDot = false): boolean {
    key = String(key);
    return key.length === 1 && !!key.match(allowDot ? "[0-9]|\\." : "[0-9]");
}

/** Checks if v is a valid number */
export function isValidNumber(key: string | number, allowDot = false, decimalPlaces = 2): boolean {
    const validationRegex = allowDot ? `^[0-9]*[.]{0,1}[0-9]{0,${decimalPlaces}}$` : "^[0-9]*$";
    return !!String(key).match(validationRegex);
}

/** Checks if key is one of the special keys listed below */
export function isSpecialKey(key: string): boolean {
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

/** Checks if v is a string with length > 0, a number or a boolean */
export function isValorized(v: any): boolean {
    return ![ "", null, undefined ].includes(v) && String(v).trim().length > 0;
}

/** Checks if v is a valid integer number */
export function isValidInteger(v: string): boolean {
    return v.length > 0 && Number.isInteger(Number(v));
}

/** Checks if v is a valid positive number */
export function isPositiveNumber(v: number): boolean {
    return v >= 0;
}

/** Checks if v is greater than min (both required) */
export function isGreaterThan(v: number, min: number): boolean {
    return v > min;
}

/** Checks if v is equal or greater than min (both required) */
export function isEqualOrGreaterThan(v: number, min: number): boolean {
    return v >= min;
}

/** Checks if v is null or greater than min (both nullable) */
export function isNullOrGreaterThan(v: number | null, min: number | null): boolean {
    if (v === null || min === null) {
        return true;
    }
    return v > min;
}

/** Checks if v is null, equal or greater than min (both nullable) */
export function isNullEqualOrGreaterThan(v: number | null, min: number | null): boolean {
    if (v === null || min === null) {
        return true;
    }
    return v >= min;
}

/** Checks if v is lower than max (both required) */
export function isLowerThan(v: number, max: number): boolean {
    return v < max;
}

/** Checks if v is equal or lower than max (both required) */
export function isEqualOrLowerThan(v: number, max: number): boolean {
    return v <= max;
}

/** Checks if v is null or lower than max (both nullable) */
export function isNullOrLowerThan(v: number | null, max: number | null): boolean {
    if (v === null || max === null) {
        return true;
    }
    return v < max;
}

/**Checks if v is null, equal or lower than max (both nullable) */
export function isNullEqualOrLowerThan(v: number | null, max: number | null): boolean {
    if (v === null || max === null) {
        return true;
    }
    return v <= max;
}

/** Validate if the input value is a valid email address */
export function isValidEmailAddress(v: string): boolean {
    return !!v.match("^(([^<>()\\[\\]\\\\.,;:\\s@\"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$");
}

export function isNotEmpty(v: any[]): boolean {
    return !!v && v.length > 0;
}

export function isEmpty(v: any[]): boolean {
    return !!v && v.length === 0;
}
