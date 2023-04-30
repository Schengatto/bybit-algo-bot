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
const providers_1 = require("./../../../core/models/enums/providers");
const market_service_1 = __importDefault(require("../services/market-service"));
const BybitPricesRoutes = (server, options) => __awaiter(void 0, void 0, void 0, function* () {
    // Prices
    server.get(`/${providers_1.CryptoExchanger.Bybit}/prices/daily`, (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        request.query.category = request.query.category || "spot";
        return yield market_service_1.default.getTickers(request.query);
    }));
    server.get(`/${providers_1.CryptoExchanger.Bybit}/prices/kline`, (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        request.query.category = request.query.category || "spot";
        return yield market_service_1.default.getKline(request.query);
    }));
    server.get(`/${providers_1.CryptoExchanger.Bybit}/prices/history`, (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        return yield market_service_1.default.getHistoricalPrices(request.query);
    }));
});
exports.default = (0, fastify_plugin_1.default)(BybitPricesRoutes);
