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
exports.updateSymbols = void 0;
const postgres_data_source_1 = require("../../../core/services/postgres-data-source");
const BybitTickerSymbol_1 = require("../models/entity/BybitTickerSymbol");
const market_service_1 = __importDefault(require("../services/market-service"));
const updateSymbols = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Retrieving symbols");
    const symbols = yield market_service_1.default.getTickers({ category: "spot" });
    const values = symbols.map((p) => {
        const dao = new BybitTickerSymbol_1.BybitTickerSymbol();
        dao.symbol = p.symbol;
        dao.isEnabled = true;
        return dao;
    });
    yield (yield (0, postgres_data_source_1.getDataSource)())
        .createQueryBuilder()
        .insert()
        .into(BybitTickerSymbol_1.BybitTickerSymbol)
        .values(values)
        .orIgnore()
        .execute();
    console.log("Updated symbols completed");
});
exports.updateSymbols = updateSymbols;
(0, exports.updateSymbols)();
