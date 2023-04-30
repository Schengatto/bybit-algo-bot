"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePrices = void 0;
// TODO implement the job that download the prices from bybit and store them in the database
const updatePrices = (params) => {
    console.log("Job completed", params);
};
exports.updatePrices = updatePrices;
(0, exports.updatePrices)(process.argv[2]);
