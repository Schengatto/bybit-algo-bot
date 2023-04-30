"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTextColorFromBackgroundHex = void 0;
/**
 * Returns the font color in hex value based on the background color RGB value provided as an argument.
 * @param red
 * @param green
 * @param blue
 */
function getTextColorFromBackgroundRGB({ red, green, blue }) {
    const cBrightness = ((red * 299) + (green * 587) + (blue * 114)) / 1000;
    return cBrightness < 100 ? "#000000" : "#ffffff";
}
/**
 * Returns the font color in hex value based on the background color hex value provided as an argument.
 * @param backgroundColor
 */
function getTextColorFromBackgroundHex(backgroundColor) {
    const red = 255 - parseInt(backgroundColor.slice(1, 3), 16);
    const green = 255 - parseInt(backgroundColor.slice(3, 5), 16);
    const blue = 255 - parseInt(backgroundColor.slice(5, 7), 16);
    return getTextColorFromBackgroundRGB({ red, green, blue });
}
exports.getTextColorFromBackgroundHex = getTextColorFromBackgroundHex;
