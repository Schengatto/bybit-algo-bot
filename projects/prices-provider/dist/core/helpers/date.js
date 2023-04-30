"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDayNameFromDate = exports.formatAbsoluteTimeOnly = exports.formatAbsoluteDateOnly = exports.formatAbsoluteDateTime = exports.parseAbsoluteDateOnly = exports.parseAbsoluteDateTime = exports.isFormatted = exports.isDateInRange = exports.dateRangeOverlaps = void 0;
const date_fns_1 = require("date-fns");
const date_fns_tz_1 = require("date-fns-tz");
/**
 * Returns true if there is at least 1 day in common between the first data range and the second data range.
 * @param firstDateRangeStart
 * @param firstDateRangeEnd
 * @param secondDateRangeStart
 * @param secondDateRangeEnd
 */
function dateRangeOverlaps(firstDateRangeStart, firstDateRangeEnd, secondDateRangeStart, secondDateRangeEnd) {
    const firstRangeStartTime = firstDateRangeStart.getTime();
    const firstRangeEndTime = firstDateRangeEnd.getTime();
    const secondRangeStartTime = secondDateRangeStart.getTime();
    const secondRangeEndTime = secondDateRangeEnd.getTime();
    if (firstRangeStartTime <= secondRangeStartTime && secondRangeStartTime <= firstRangeEndTime)
        return true; // b starts in a
    if (firstRangeStartTime <= secondRangeEndTime && secondRangeEndTime <= firstRangeEndTime)
        return true; // b ends in a
    if (secondRangeStartTime < firstRangeStartTime && firstRangeEndTime < secondRangeEndTime)
        return true; // a in b
    return false;
}
exports.dateRangeOverlaps = dateRangeOverlaps;
/**
 * Returns true if the date provided as first argument inside the date range begin and end.
 * @param date
 * @param begin
 * @param end
 */
function isDateInRange(date, begin, end) {
    return date.getTime() >= begin.getTime() && date.getTime() <= end.getTime();
}
exports.isDateInRange = isDateInRange;
/**
 * Returns true if the date provided as first input respects the format provided as second argument.
 * @param value
 * @param format
 */
function isFormatted(value, format) {
    return !isNaN((0, date_fns_1.parse)(value, format, new Date()).getTime());
}
exports.isFormatted = isFormatted;
/**
 * Returns a Date having the system timezone from the UTC date string provided as an argument.
 * Example: parseAbsoluteDateTime("2022-01-15T10:30:00Z") equals new Date("2022-01-15 10:30:00");
 * @param dateString
 */
function parseAbsoluteDateTime(dateString) {
    return (0, date_fns_tz_1.utcToZonedTime)(new Date(dateString), "UTC");
}
exports.parseAbsoluteDateTime = parseAbsoluteDateTime;
/**
 * Returns a date parsing the string of format `dd-MM-YYYY` provided as argument to a date without considering local TimeZone.
 * Example: parseAbsoluteDateOnly("2022-01-15") equals new Date("2022-01-15 00:00:00")
 * @param dateOnlyString
 */
function parseAbsoluteDateOnly(dateOnlyString) {
    return parseAbsoluteDateTime(`${dateOnlyString}T00:00:00Z`);
}
exports.parseAbsoluteDateOnly = parseAbsoluteDateOnly;
/**
 * Returns the string of format `yyyy-MM-ddTHH:mm:ssZ` of the date provided as argument without considering local TimeZone.
 * Example: formatAbsoluteDateTime(new Date("2022-01-15 10:30:00")) equals "2022-01-15T10:30:00Z"
 * @param date
 */
function formatAbsoluteDateTime(date) {
    return (0, date_fns_1.lightFormat)(date, "yyyy-MM-dd'T'HH:mm:ss'Z'");
}
exports.formatAbsoluteDateTime = formatAbsoluteDateTime;
/**
 * Returns a string of format `dd-MM-YYYY` of the date provided as argument without considering local TimeZone.
 * Example: formatAbsoluteDateOnly(new Date("2022-01-15 00:00:00")) equals "2022-01-15"
 * @param date
 */
function formatAbsoluteDateOnly(date) {
    return (0, date_fns_1.lightFormat)(date, "yyyy-MM-dd");
}
exports.formatAbsoluteDateOnly = formatAbsoluteDateOnly;
/**
 * Returns a string of format `HH:mm` of the date provided as argument without considering local TimeZone.
 * Example: formatAbsoluteTimeOnly(new Date("2022-01-15 21:30:00")) equals "21:30"
 * @param date
 */
function formatAbsoluteTimeOnly(date) {
    return (0, date_fns_1.lightFormat)(date, "HH:mm");
}
exports.formatAbsoluteTimeOnly = formatAbsoluteTimeOnly;
/**
 * Returns the week day name from the date provided as argument.
 * Example: getWeekDayName(new Date("2023-01-01")) equals "sunday"
 * @param date
 */
function getDayNameFromDate(date) {
    const weekDays = [
        { name: "monday", weekDay: 1 },
        { name: "tuesday", weekDay: 2 },
        { name: "wednesday", weekDay: 3 },
        { name: "thursday", weekDay: 4 },
        { name: "friday", weekDay: 5 },
        { name: "saturday", weekDay: 6 },
        { name: "sunday", weekDay: 0 }
    ];
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return weekDays.find(day => day.weekDay === date.getDay()).name;
}
exports.getDayNameFromDate = getDayNameFromDate;
