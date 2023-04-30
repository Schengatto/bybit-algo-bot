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
exports.updatePrices = void 0;
const date_fns_1 = require("date-fns");
const array_1 = require("../../../core/helpers/array");
const postgres_data_source_1 = require("../../../core/services/postgres-data-source");
const BybitPrice_1 = require("../models/entity/BybitPrice");
const market_service_1 = __importDefault(require("../services/market-service"));
const DEFAULT_CHUNK_SIZE = 200;
const DEFAULT_STARTING_DATE = new Date("2022-01-01").getTime();
const DEFAULT_INTERVAL = "60";
const brokenSymbols = new Set();
const updatePrices = (symbol) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log("Downloading prices for symbol " + symbol);
    const dataSource = yield (0, postgres_data_source_1.getDataSource)();
    const priceRepository = dataSource.getRepository(BybitPrice_1.BybitPrice);
    const oneHourAgo = (0, date_fns_1.addHours)(new Date(), -1).getTime();
    let lastStoredDate = Number(((_a = (yield priceRepository.findOne({ where: { symbol }, order: { startTime: "DESC" } }))) === null || _a === void 0 ? void 0 : _a.startTime) || DEFAULT_STARTING_DATE);
    let delta = (0, date_fns_1.differenceInHours)(oneHourAgo, lastStoredDate);
    while (delta > 0) {
        const start = (0, date_fns_1.addHours)(new Date(lastStoredDate), 1).getTime();
        const prices = yield market_service_1.default.getKline({ category: "spot", symbol, interval: DEFAULT_INTERVAL, start, limit: DEFAULT_CHUNK_SIZE });
        if (!prices.length) {
            lastStoredDate = (0, date_fns_1.addHours)(start, DEFAULT_CHUNK_SIZE).getTime();
            delta = (0, date_fns_1.differenceInHours)(oneHourAgo, lastStoredDate);
            continue;
        }
        const orderedPrices = (0, array_1.orderAscByProperty)(prices, "startTime");
        const values = orderedPrices.map((p) => {
            const dao = new BybitPrice_1.BybitPrice();
            dao.symbol = p.symbol;
            dao.startTime = p.startTime;
            dao.open = p.open;
            dao.close = p.close;
            dao.low = p.low;
            dao.high = p.high;
            dao.volume = p.volume;
            return dao;
        });
        // Bulk insert all prices
        yield dataSource
            .createQueryBuilder()
            .insert()
            .into(BybitPrice_1.BybitPrice)
            .values(values)
            .execute();
        lastStoredDate = orderedPrices[orderedPrices.length - 1].startTime;
        delta = (0, date_fns_1.differenceInHours)(oneHourAgo, lastStoredDate);
    }
});
exports.updatePrices = updatePrices;
const updateSymbolPrices = (index, symbols) => setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
    if (symbols.length > index) {
        try {
            yield (0, exports.updatePrices)(symbols[index]);
        }
        catch (error) {
            console.error(`There was an error updating prices for symbol ${symbols[index]}`);
            brokenSymbols.add(symbols[index]);
        }
        index++;
        updateSymbolPrices(index, symbols);
    }
    else {
        if (!!brokenSymbols.size)
            console.error(`Found ${brokenSymbols.size} errors: ${[...brokenSymbols.keys()]}`);
    }
}), 0);
if (process.argv.length < 2) {
    throw new Error("You must provide a symbol");
}
else {
    const symbols = process.argv[2].split(",");
    updateSymbolPrices(0, symbols);
}
