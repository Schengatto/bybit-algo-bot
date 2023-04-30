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
const bybit_http_service_1 = __importDefault(require("./bybit-http-service"));
const mappers_1 = require("./helpers/mappers");
const validations_1 = require("./helpers/validations");
const postgres_data_source_1 = require("../../../core/services/postgres-data-source");
const BybitPrice_1 = require("../models/entity/BybitPrice");
const date_fns_1 = require("date-fns");
const array_1 = require("../../../core/helpers/array");
const PATH_ROOT = "market";
class MarketHttpService {
    getTickers(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = new request_builder_1.RequestBuilder()
                .withURL(`${settings_1.API_BASE_URL}/${settings_1.API_VERSION_5}/${PATH_ROOT}/tickers`)
                .withParams(Object.assign({}, params))
                .build();
            return bybit_http_service_1.default.get(request)
                .then(res => res.data)
                .then(validations_1.getResult)
                .then((data) => data.list.map(mappers_1.GetTickersMapper.mapToClientModel));
        });
    }
    getKline(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = new request_builder_1.RequestBuilder()
                .withURL(`${settings_1.API_BASE_URL}/${settings_1.API_VERSION_5}/${PATH_ROOT}/kline`)
                .withParams(Object.assign({}, params))
                .build();
            return bybit_http_service_1.default.get(request)
                .then(res => res.data)
                .then(validations_1.getResult)
                .then(mappers_1.GetKlineMapper.mapToClientModel);
        });
    }
    getHistoricalPrices(params) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const dataSource = yield (0, postgres_data_source_1.getDataSource)();
            const priceRepository = dataSource.getRepository(BybitPrice_1.BybitPrice);
            const now = new Date().getTime();
            const storedHistoricalPrices = yield priceRepository
                .createQueryBuilder('price')
                .where('price.symbol = :symbol', { symbol: params.symbol })
                .andWhere('price.startTime >= :from', { from: (_a = params.start) !== null && _a !== void 0 ? _a : 0 })
                .andWhere('price.startTime <= :to', { to: (_b = params.end) !== null && _b !== void 0 ? _b : new Date().getTime() })
                .getMany();
            const getPercentDelta = (from, to) => Number(((to - from) / from * 100).toFixed(4));
            let result = storedHistoricalPrices.map(p => ({ startTime: Number(p.startTime), symbol: params.symbol, open: Number(p.open), close: Number(p.close), high: Number(p.high), low: Number(p.low), volume: Number(p.volume), priceChangePercent: getPercentDelta(p.open, p.close) }));
            result = (0, array_1.orderDescByProperty)(result, "startTime");
            let lastStoredDate = Number(result[0].startTime);
            let delta = (0, date_fns_1.differenceInHours)(now, lastStoredDate);
            const DEFAULT_CHUNK_SIZE = 200;
            while (delta > 0) {
                const start = (0, date_fns_1.addHours)(new Date(lastStoredDate), 1).getTime();
                const prices = yield this.getKline({ category: "spot", symbol: params.symbol, interval: "60", start, limit: DEFAULT_CHUNK_SIZE });
                if (!prices.length) {
                    lastStoredDate = (0, date_fns_1.addHours)(start, DEFAULT_CHUNK_SIZE).getTime();
                    delta = (0, date_fns_1.differenceInHours)(now, lastStoredDate);
                    continue;
                }
                const orderedPrices = (0, array_1.orderDescByProperty)(prices, "startTime");
                result.unshift(...orderedPrices);
                lastStoredDate = Number(orderedPrices[orderedPrices.length - 1].startTime);
                delta = (0, date_fns_1.differenceInHours)(now, lastStoredDate);
            }
            return result;
        });
    }
}
exports.default = new MarketHttpService();
