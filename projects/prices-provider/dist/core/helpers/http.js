"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHeaderFromResponse = exports.isCancelEvent = exports.getUrlWithoutQueryParams = exports.buildUrlQueryParams = exports.toQueryStringValue = exports.getItemStringValue = exports.ApiServiceNamespaces = void 0;
const date_fns_1 = require("date-fns");
const cancelProperty = "__CANCEL__";
var ApiServiceNamespaces;
(function (ApiServiceNamespaces) {
    ApiServiceNamespaces["GuideService"] = "guide-service";
    ApiServiceNamespaces["GuideMasterDataService"] = "guide-master-data-service";
    ApiServiceNamespaces["ContractMasterData"] = "contract-master-data";
})(ApiServiceNamespaces = exports.ApiServiceNamespaces || (exports.ApiServiceNamespaces = {}));
function getItemStringValue(item) {
    return item instanceof Date
        ? (0, date_fns_1.formatISO)(item, { representation: "date" })
        : String(item);
}
exports.getItemStringValue = getItemStringValue;
/**
 * Return the query string value of the filter value provided as input.
 * @param value
 */
function toQueryStringValue(value) {
    return Array.isArray(value)
        ? String(value.map(i => getItemStringValue(i)))
        : getItemStringValue(value);
}
exports.toQueryStringValue = toQueryStringValue;
/**
 * Return query params string. If the baseUrl is provided then this method returns the url
 * of the request comprehensive of the query params provided as input.
 * @param params
 * @param baseUrl
 */
function buildUrlQueryParams(params, baseUrl = "") {
    const isNotArrayOrArrayWithElements = (field) => !Array.isArray(params[field]) || (Array.isArray(params[field]) && params[field].length);
    const isFieldValued = (field) => params[field] !== null && params[field] !== undefined && params[field] !== "";
    return Object.keys(params)
        .filter(k => isFieldValued(k) && isNotArrayOrArrayWithElements(k))
        .reduce((acc, cur, index) => (acc.concat(`${index === 0 ? "?" : "&"}${cur}=${encodeURIComponent(toQueryStringValue(params[cur]))}`)), `${baseUrl}`);
}
exports.buildUrlQueryParams = buildUrlQueryParams;
/**
 * Return the baseUrl without the query parameters from the requestUrl provided as input.
 * @param requestUrl
 */
function getUrlWithoutQueryParams(requestUrl) {
    return requestUrl.indexOf("?") > -1 ? requestUrl.substr(0, requestUrl.indexOf("?")) : requestUrl;
}
exports.getUrlWithoutQueryParams = getUrlWithoutQueryParams;
/**
 * Return true if the event is related to a cancelled http request.
 * @param event
 */
function isCancelEvent(event) {
    const proto = Object.getPrototypeOf(event);
    return proto[cancelProperty];
}
exports.isCancelEvent = isCancelEvent;
/**
 * Read the headers from the request and return the one with the key provided as second argument.
 * @param response
 * @returns
 */
function getHeaderFromResponse(response, header) {
    const headers = response.headers;
    const lowerCaseHeaders = Object.keys(headers).reduce((acc, key) => (Object.assign(Object.assign({}, acc), { [key.toLowerCase()]: headers[key] })), {});
    return lowerCaseHeaders[header];
}
exports.getHeaderFromResponse = getHeaderFromResponse;
