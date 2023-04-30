"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractHttpService = void 0;
const axios_1 = __importDefault(require("axios"));
const http_1 = require("../helpers/http");
let _pendingRequests = new Map();
class AbstractHttpService {
    constructor() {
        this.cancelTokenSource = axios_1.default.CancelToken.source();
        this.axios = axios_1.default.create({
            cancelToken: this.cancelTokenSource.token,
        });
        this.axios.interceptors.request.use(this.onRequestIntercept, this.onRequestError);
        this.axios.interceptors.response.use(this.handleSuccessResponse, this.handleErrorResponse);
    }
    static isFailResponse(data) {
        return typeof data === "object" && "code" in data && "message" in data;
    }
    set pendingRequests(pendingRequests) {
        _pendingRequests = pendingRequests;
    }
    onRequestIntercept(config) {
        const tokenSource = axios_1.default.CancelToken.source();
        if (config.method === "get" && config.url) {
            const requestUrl = (0, http_1.getUrlWithoutQueryParams)(config.url);
            const previousRequestCancelTokenSource = _pendingRequests.get(requestUrl);
            if (previousRequestCancelTokenSource) {
                previousRequestCancelTokenSource.cancel();
            }
            _pendingRequests.set(requestUrl, tokenSource);
        }
        return Object.assign(Object.assign({}, config), { data: config.data, cancelToken: tokenSource.token });
    }
    onRequestError(error) {
        return Promise.reject(error);
    }
    handleSuccessResponse(res) {
        if (res.config.url) {
            _pendingRequests.delete((0, http_1.getUrlWithoutQueryParams)(res.config.url));
        }
        if (res.config.responseType === "blob") {
            return res;
        }
        return res;
    }
    handleErrorResponse(error) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!(0, http_1.isCancelEvent)(error) && ((_a = error.config) === null || _a === void 0 ? void 0 : _a.url)) {
                _pendingRequests.delete((0, http_1.getUrlWithoutQueryParams)(error.config.url));
            }
            if ((0, http_1.isCancelEvent)(error) || !error.response) {
                return Promise.reject(error);
            }
        });
    }
    cancelPendingRequests() {
        var _a;
        (_a = this.cancelTokenSource) === null || _a === void 0 ? void 0 : _a.cancel();
        this.cancelTokenSource = axios_1.default.CancelToken.source();
    }
    onUnhandledrejection(event) {
        if ((0, http_1.isCancelEvent)(event.reason)) {
            event.preventDefault();
        }
    }
    get(requestInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const { parameters, url } = requestInfo;
            let requestHeaders = Object.assign({}, requestInfo.headers);
            if (!requestInfo.isAnonymous) {
                requestHeaders = Object.assign(Object.assign({}, requestHeaders), (yield this.getAuthenticationHeaders(requestInfo)));
            }
            return yield this.axios.get(`${url}${(0, http_1.buildUrlQueryParams)(parameters || {})}`, { headers: requestHeaders });
        });
    }
    getFile(requestInfo) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const { headers, parameters, url } = requestInfo;
            const response = yield this.axios.get(`${url}${(0, http_1.buildUrlQueryParams)(parameters || {})}`, Object.assign(Object.assign(Object.assign({}, headers), this.getAuthenticationHeaders(requestInfo)), { responseType: "blob" }));
            return {
                fileName: (_b = this.getFileNameFromContentDispositionHeader((_a = response.headers["content-disposition"]) !== null && _a !== void 0 ? _a : "")) !== null && _b !== void 0 ? _b : "untitled-file",
                fileData: new Blob([response.data], { type: response.headers["content-type"] }),
            };
        });
    }
    post(requestInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const { parameters, url, payload } = requestInfo;
            let requestHeaders = Object.assign({}, requestInfo.headers);
            if (!requestInfo.isAnonymous) {
                requestHeaders = Object.assign(Object.assign({}, requestHeaders), (yield this.getAuthenticationHeaders(requestInfo)));
            }
            return yield this.axios.post(`${url}${(0, http_1.buildUrlQueryParams)(parameters || {})}`, payload, {
                headers: requestHeaders,
            });
        });
    }
    put(requestInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const { parameters, payload, url } = requestInfo;
            let requestHeaders = Object.assign({}, requestInfo.headers);
            if (!requestInfo.isAnonymous) {
                requestHeaders = Object.assign(Object.assign({}, requestHeaders), (yield this.getAuthenticationHeaders(requestInfo)));
            }
            return yield this.axios.put(`${url}${(0, http_1.buildUrlQueryParams)(parameters || {})}`, payload, {
                headers: requestHeaders,
            });
        });
    }
    delete(requestInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const { parameters, url, payload } = requestInfo;
            let requestHeaders = Object.assign({}, requestInfo.headers);
            if (!requestInfo.isAnonymous) {
                requestHeaders = Object.assign(Object.assign({}, requestHeaders), (yield this.getAuthenticationHeaders(requestInfo)));
            }
            return yield this.axios.delete(`${url}${(0, http_1.buildUrlQueryParams)(parameters || {})}`, {
                headers: requestHeaders,
            });
        });
    }
    getFileNameFromContentDispositionHeader(header) {
        if (header.startsWith("attachment")) {
            const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
            const matches = filenameRegex.exec(header);
            if (matches !== null && matches[1]) {
                return matches[1].replace(/['"]/g, "");
            }
        }
        return null;
    }
}
exports.AbstractHttpService = AbstractHttpService;
