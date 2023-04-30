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
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const providers_1 = require("../../../core/models/enums/providers");
const account_service_1 = __importDefault(require("../services/account-service"));
const BybitWalletRoutes = (server, options) => __awaiter(void 0, void 0, void 0, function* () {
    server.get(`/${providers_1.CryptoExchanger.Bybit}/account/wallet`, (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        return yield account_service_1.default.getWalletBalance(request.query);
    }));
});
exports.default = (0, fastify_plugin_1.default)(BybitWalletRoutes);
