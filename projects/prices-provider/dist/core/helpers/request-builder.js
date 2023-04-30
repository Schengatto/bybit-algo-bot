"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestBuilder = void 0;
class RequestBuilder {
    constructor() {
        this._headers = {};
        this._params = {};
        this._isAnonymous = false;
    }
    withURL(value) {
        this._url = value;
        return this;
    }
    withHeaders(headers) {
        this._headers = Object.assign(Object.assign({}, this._headers), headers);
        return this;
    }
    withParams(params) {
        this._params = Object.assign(Object.assign({}, this._params), params);
        return this;
    }
    withPayload(payload) {
        this._payload = payload;
        return this;
    }
    withContentType(contentType) {
        return this.withHeaders({ "Content-Type": contentType });
    }
    withoutAuthentication() {
        this._isAnonymous = true;
        return this;
    }
    build() {
        if (!this._url) {
            throw new Error("URL is not defined");
        }
        return {
            url: this._url,
            headers: this._headers,
            parameters: this._params,
            payload: this._payload,
            isAnonymous: this._isAnonymous,
        };
    }
}
exports.RequestBuilder = RequestBuilder;
