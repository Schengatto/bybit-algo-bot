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
const validations_1 = require("./helpers/validations");
const bybit_http_service_1 = __importDefault(require("./bybit-http-service"));
class MarketHttpService {
    /** https://bybit-exchange.github.io/docs/v5/account/wallet-balance */
    getWalletBalance(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = new request_builder_1.RequestBuilder()
                .withURL(`${settings_1.API_BASE_URL}/spot/${settings_1.API_VERSION_3}/private/account`)
                .withParams(Object.assign({}, params))
                .build();
            return bybit_http_service_1.default.get(request)
                .then(res => res.data)
                .then(validations_1.getResult)
                .then((data) => data.balances);
        });
    }
}
exports.default = new MarketHttpService();
