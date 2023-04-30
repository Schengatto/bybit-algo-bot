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
exports.checkPrices = void 0;
const market_service_1 = __importDefault(require("../services/market-service"));
const array_1 = require("../../../core/helpers/array");
const telegram_1 = require("../../telegram/telegram");
const checkPrices = (threshold) => __awaiter(void 0, void 0, void 0, function* () {
    const symbolPriceInfo = (yield market_service_1.default.getTickers({ category: "spot" }))
        .filter(price => price.priceChangePercent >= threshold || price.priceChangePercent <= -threshold)
        .filter(price => price.symbol.includes("USDT"));
    if (!symbolPriceInfo.length)
        return;
    (0, array_1.orderDescByProperty)(symbolPriceInfo, "priceChangePercent");
    const priceWarnings = symbolPriceInfo.map(price => ({
        symbol: price.symbol,
        currentPrice: price.current,
        bidPrice: price.bidPrice,
        askPrice: price.askPrice,
        changeRatio: `${price.priceChangePercent.toFixed(2)} %`
    })).map(price => `${price.symbol} changed by ${price.changeRatio}. The current price is ${price.currentPrice} | bid: ${price.bidPrice} | ask: ${price.askPrice}`);
    priceWarnings.unshift("📢 Interesting price changes during the last 24h 📢");
    telegram_1.AlgoTelegramBot.sendMessages(priceWarnings);
});
exports.checkPrices = checkPrices;
const threshold = process.argv.length >= 2 ? Number(process.argv[2]) : 5;
(0, exports.checkPrices)(threshold);
