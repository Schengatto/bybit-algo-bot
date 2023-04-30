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
const request_builder_1 = require("./../../../core/helpers/request-builder");
const settings_1 = require("../config/settings");
const capital_http_service_1 = __importDefault(require("./capital-http-service"));
const baseUrl = (isDemo) => isDemo ? settings_1.TESTNET_API_BASE_URL : settings_1.API_BASE_URL;
class AccountHttpService {
    getAccounts(isDemo) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = new request_builder_1.RequestBuilder()
                .withURL(`${baseUrl(isDemo)}/${settings_1.API_VERSION_1}/accounts`)
                .build();
            return capital_http_service_1.default
                .get(request)
                .then((res) => res.data)
                .then((data) => data.accounts);
        });
    }
}
exports.default = new AccountHttpService();
