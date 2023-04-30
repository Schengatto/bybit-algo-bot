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
exports.getDataSource = exports.PostgresDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const BybitPrice_1 = require("../../modules/bybit/models/entity/BybitPrice");
const BybitTickerSymbol_1 = require("../../modules/bybit/models/entity/BybitTickerSymbol");
exports.PostgresDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "demo",
    database: "crypto_algo_trading",
    entities: [BybitPrice_1.BybitPrice, BybitTickerSymbol_1.BybitTickerSymbol],
    synchronize: true,
    logging: false,
});
exports.PostgresDataSource.initialize()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Connection initialized with database...");
}))
    .catch((error) => console.log(error));
const getDataSource = (delay = 2000) => {
    if (exports.PostgresDataSource.isInitialized)
        return Promise.resolve(exports.PostgresDataSource);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (exports.PostgresDataSource.isInitialized)
                resolve(exports.PostgresDataSource);
            else
                reject("Failed to create connection with database");
        }, delay);
    });
};
exports.getDataSource = getDataSource;
