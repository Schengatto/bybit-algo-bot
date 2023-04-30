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
const crypto_1 = __importDefault(require("crypto"));
const http_service_1 = require("../../../core/services/http-service");
class BybitHttpService extends http_service_1.AbstractHttpService {
    constructor() {
        super(...arguments);
        this._apiKey = "";
        this._apiSecret = "";
    }
    init(config) {
        this._apiKey = config.apiKey;
        this._apiSecret = config.apiSecret;
    }
    getAuthenticationHeaders(requestInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.createAuthenticationHeaders(requestInfo.parameters);
        });
    }
    createAuthenticationHeaders(params) {
        const hasValidValue = (field) => params[field] !== null && params[field] !== undefined && params[field] !== "";
        const paramsAsString = Object.keys(params)
            .filter(hasValidValue)
            .map(key => `${key}=${params[key]}`)
            .join("&");
        const recvWindow = "5000";
        const timestamp = Date.now().toString();
        const sign = this.getSignature(paramsAsString, timestamp, recvWindow);
        return {
            'X-BAPI-SIGN-TYPE': '2',
            'X-BAPI-SIGN': sign,
            'X-BAPI-API-KEY': this._apiKey,
            'X-BAPI-TIMESTAMP': timestamp,
            'X-BAPI-RECV-WINDOW': recvWindow,
            "cdn-request-id": "test" + timestamp,
            'Content-Type': 'application/json; charset=utf-8'
        };
    }
    getSignature(parameters, timestamp, recvWindow) {
        const seed = timestamp + this._apiKey + recvWindow + parameters;
        return crypto_1.default.createHmac('sha256', this._apiSecret)
            .update(seed)
            .digest('hex');
    }
}
exports.default = new BybitHttpService();
