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
Object.defineProperty(exports, "__esModule", { value: true });
exports.startJobs = void 0;
const schedule = require('node-schedule');
const { fork } = require('child_process');
const array_1 = require("../../../core/helpers/array");
const postgres_data_source_1 = require("../../../core/services/postgres-data-source");
const BybitTickerSymbol_1 = require("../models/entity/BybitTickerSymbol");
const updateSymbolsPrices = () => __awaiter(void 0, void 0, void 0, function* () {
    (0, postgres_data_source_1.getDataSource)()
        .then((dataSource) => {
        const symbolRepository = dataSource.getRepository(BybitTickerSymbol_1.BybitTickerSymbol);
        symbolRepository.find({ where: { isEnabled: true }, order: { symbol: "DESC" } })
            .then(tickers => tickers.map(ticker => ticker.symbol))
            .then(array_1.orderAsc)
            .then(symbols => {
            const worker_process = fork(`${__dirname}/update-prices.js`, [symbols]);
            worker_process.on('close', () => console.log('update-prices job completed'));
        });
        ;
    });
});
const startJobs = () => {
    console.log("Scheduling jobs...");
    const checkPrices = schedule.scheduleJob('0 0 7/1 * * *', () => {
        const worker_process = fork(`${__dirname}/check-prices.js`, [10]);
        worker_process.on('close', () => console.log('check-prices job completed'));
    });
    const updatePrices = schedule.scheduleJob('0 0 */1 * * *', () => __awaiter(void 0, void 0, void 0, function* () {
        const worker_process = fork(`${__dirname}/update-symbols.js`);
        worker_process.on('close', () => __awaiter(void 0, void 0, void 0, function* () { return updateSymbolsPrices(); }));
    }));
    console.log("All job schedulated.");
};
exports.startJobs = startJobs;
