import { SymbolTimeframePriceInfo } from "./../../models/client-models";
import { GetKlineResult, SymbolPriceApiModel } from './../market-service.d';

export class GetTickersMapper {
    static mapToClientModel(apiModel: SymbolPriceApiModel): SymbolTimeframePriceInfo {
        let startTime = new Date();
        startTime.setDate(startTime.getDate() - 1);

        return {
            startTime: startTime.getTime(),
            symbol: apiModel.symbol,
            current: Number(apiModel.lastPrice),
            bidPrice: Number(apiModel.bid1Price),
            askPrice: Number(apiModel.ask1Price),
            open: Number(apiModel.prevPrice24h),
            close: Number(apiModel.lastPrice),
            low: Number(apiModel.lowPrice24h),
            high: Number(apiModel.highPrice24h),
            volume: Number(apiModel.volume24h),
            priceChangePercent: Number(apiModel.price24hPcnt) * 100,
            turnover: Number(apiModel.turnover24h)
        };
    }
}

export class GetKlineMapper {
    static mapToClientModel(apiModel: GetKlineResult): SymbolTimeframePriceInfo[] {
        const getPercentDelta = (from: number, to: number): number => Number(((to - from) / from * 100).toFixed(4));
        return apiModel.list.map(candle => {
            const [startTime, open, high, low, close, volume, turnover] = candle;
            const priceChangePercent = getPercentDelta(Number(open), Number(close));
            return {
                symbol: apiModel.symbol,
                startTime: Number(startTime),
                open: Number(open),
                high: Number(high),
                low: Number(low),
                current: Number(close),
                close: Number(close),
                volume: Number(volume),
                turnover: Number(turnover),
                priceChangePercent: priceChangePercent
            }
        });
    }
}
