"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceItemAtIndex = exports.uniqueByKeyValue = exports.removeDuplicateObjects = exports.arraysEqual = exports.orderDescDates = exports.orderAscDates = exports.orderDescByProperty = exports.orderAscByProperty = exports.orderDesc = exports.orderAsc = void 0;
function simpleSort(array, isASC) {
    return [...array].sort((a, b) => {
        if (getComparableValue(a) > getComparableValue(b)) {
            return isASC ? 1 : -1;
        }
        if (getComparableValue(a) < getComparableValue(b)) {
            return isASC ? -1 : 1;
        }
        return 0;
    });
}
function sortByProperty(array, isASC, propertyName) {
    return [...array].sort((a, b) => {
        if (getComparableValue(a[propertyName]) > getComparableValue(b[propertyName])) {
            return isASC ? 1 : -1;
        }
        if (getComparableValue(a[propertyName]) < getComparableValue(b[propertyName])) {
            return isASC ? -1 : 1;
        }
        return 0;
    });
}
function getComparableValue(value) {
    if (typeof value === "string" || value instanceof String) {
        return value.toLowerCase();
    }
    else if (value instanceof Date) {
        return value.getTime();
    }
    else {
        return value;
    }
}
/** Sort the array in ascending order  */
function orderAsc(array) {
    return simpleSort(array, true);
}
exports.orderAsc = orderAsc;
/** Sort the array in descending order */
function orderDesc(array) {
    return simpleSort(array, false);
}
exports.orderDesc = orderDesc;
/** Sort the array in ascending order by the value of the object property passed in input  */
function orderAscByProperty(array, propertyName) {
    return sortByProperty(array, true, propertyName);
}
exports.orderAscByProperty = orderAscByProperty;
/** Sort the array in descending order by the value of the object property passed in input  */
function orderDescByProperty(array, propertyName) {
    return sortByProperty(array, false, propertyName);
}
exports.orderDescByProperty = orderDescByProperty;
function orderAscDates(dates) {
    return orderAsc(dates.map(d => d.getTime())).map(t => new Date(t));
}
exports.orderAscDates = orderAscDates;
function orderDescDates(dates) {
    return orderDesc(dates.map(d => d.getTime())).map(t => new Date(t));
}
exports.orderDescDates = orderDescDates;
// TODO: temp (it works only with array having primitive items)
function arraysEqual(a, b) {
    if (a === b)
        return true;
    if (a.length !== b.length)
        return false;
    const aSorted = orderAsc(a);
    const bSorted = orderAsc(b);
    for (let i = 0; i < aSorted.length; ++i) {
        if (aSorted[i] !== bSorted[i])
            return false;
    }
    return true;
}
exports.arraysEqual = arraysEqual;
/** Remove duplicate objects from array  */
function removeDuplicateObjects(a) {
    const uniqueObjects = [];
    const uniqueValues = [];
    a.filter(obj => {
        const jsonObj = JSON.stringify(obj);
        if (!uniqueValues.includes(jsonObj)) {
            uniqueValues.push(jsonObj);
            uniqueObjects.push(obj);
        }
    });
    return uniqueObjects;
}
exports.removeDuplicateObjects = removeDuplicateObjects;
/** Filter an array of objects by the specified key value */
function uniqueByKeyValue(array, key) {
    return array.reduce((acc, cur) => acc.find(i => i[key] === cur[key]) ? acc : [...acc, cur], []);
}
exports.uniqueByKeyValue = uniqueByKeyValue;
/**
 * Replace the element of the source array at the replaceAtIndex position with the updatedItem provided as an argument.
 * @param source
 * @param replaceAtIndex
 * @param updatedItem
 */
function replaceItemAtIndex(source, replaceAtIndex, updatedItem) {
    return source.reduce((output, current, index) => index !== replaceAtIndex
        ? [...output, current]
        : [...output, updatedItem], new Array());
}
exports.replaceItemAtIndex = replaceItemAtIndex;
