import { SymbolTimeframePriceInfo } from "../models/client-models";
import MarketHttpService from "../services/market-service";
import { orderDescByProperty } from "../../../core/helpers/array";
import { AlgoTelegramBot } from "../../telegram/telegram";

export const checkPrices = async (threshold: number) => {
    const symbolPriceInfo: SymbolTimeframePriceInfo[] = (await MarketHttpService.getTickers({ category: "spot" }))
        .filter(price => price.priceChangePercent >= threshold || price.priceChangePercent <= -threshold)
        .filter(price => price.symbol.includes("USDT"));

    if (!symbolPriceInfo.length) return;

    orderDescByProperty(symbolPriceInfo, "priceChangePercent");
    const priceWarnings = symbolPriceInfo.map(price => ({
        symbol: price.symbol,
        currentPrice: price.current,
        bidPrice: price.bidPrice,
        askPrice: price.askPrice,
        changeRatio: `${price.priceChangePercent.toFixed(2)} %`
    })).map(price => `${price.symbol} changed by ${price.changeRatio}. The current price is ${price.currentPrice} | bid: ${price.bidPrice} | ask: ${price.askPrice}`);
    priceWarnings.unshift("📢 Interesting price changes during the last 24h 📢");

    AlgoTelegramBot.sendMessages(priceWarnings);
}

const threshold: number = process.argv.length >= 2 ? Number(process.argv[2]) : 5;
checkPrices(threshold);
