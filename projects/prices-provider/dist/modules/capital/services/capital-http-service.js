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
const request_builder_1 = require("../../../core/helpers/request-builder");
const http_service_1 = require("../../../core/services/http-service");
const settings_1 = require("../config/settings");
class CapitalHttpService extends http_service_1.AbstractHttpService {
    constructor() {
        super(...arguments);
        this._apiKey = "";
        this._identifier = "";
        this._password = "";
    }
    init(config) {
        return __awaiter(this, void 0, void 0, function* () {
            this._apiKey = config.apiKey;
            this._identifier = config.identifier;
            this._password = config.password;
            this.createAuthenticationHeaders();
        });
    }
    getAuthenticationHeaders(requestInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.createAuthenticationHeaders();
        });
    }
    getAuthInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            const request = new request_builder_1.RequestBuilder()
                .withURL(`${settings_1.API_BASE_URL}/${settings_1.API_VERSION_1}/session/encryptionKey`)
                .withHeaders({ "X-CAP-API-KEY": this._apiKey })
                .withoutAuthentication()
                .build();
            const response = yield this.get(request);
            const data = response.data;
            return { encryptionKey: data.encryptionKey, timestamp: data.timestamp };
        });
    }
    createEncryptPassword(authInfo) {
        try {
            const input = Buffer.from(`${this._password}|${authInfo.timestamp}`);
            const key = { key: authInfo.encryptionKey, format: "pem", type: "pkcs1" };
            const publicKey = crypto_1.default.createPublicKey(key);
            const encrypted = crypto_1.default.publicEncrypt(publicKey, input);
            return encrypted.toString();
        }
        catch (e) {
            throw new Error(e);
        }
    }
    createSession(password, isEncrypted = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = new request_builder_1.RequestBuilder()
                .withURL(`${settings_1.API_BASE_URL}/${settings_1.API_VERSION_1}/session`)
                .withPayload({ identifier: this._identifier, password, encryptedPassword: isEncrypted })
                .withHeaders({ "X-CAP-API-KEY": this._apiKey })
                .withoutAuthentication()
                .build();
            // CST and X-SECURITY-TOKEN (10 minutes after last use)
            // CST is an authorization token, X-SECURITY-TOKEN shows which financial account is used for the trades.
            const response = yield this.post(request);
            const securityToken = response.headers["X-SECURITY-TOKEN"];
            const cst = response.headers["CST"];
            return { cst, securityToken };
        });
    }
    createAuthenticationHeaders() {
        return __awaiter(this, void 0, void 0, function* () {
            // const authInfo = await this.getAuthInfo();
            // const encyptedPassword = await this.createEncryptPassword(authInfo);
            const session = yield this.createSession(this._password);
            // check the encryptionKey and timestmap
            return {
                "X-SECURITY-TOKEN": session.securityToken,
                "CST": session.cst,
                "Content-Type": "application/json; charset=utf-8",
            };
        });
    }
}
exports.default = new CapitalHttpService();
