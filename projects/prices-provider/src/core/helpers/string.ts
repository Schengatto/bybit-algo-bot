/**
 * Return the input value without diacritics
 * https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript
 * @param value
 */
export function removeDiacritics(value: string): string {
    return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function normalizeString(value: string): string {
    return removeDiacritics(value.toLowerCase());
}

export function equalsIgnoreCase(first: string, second: string): boolean {
    return first.toLowerCase() === second.toLowerCase();
}

