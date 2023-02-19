import { SymbolPriceApiModel } from './../market-service.d';
import { SymbolTimeframePriceInfo } from "./../../models/client-models";

export class GetTickersMapper {
    static mapToClientModel(apiModel: SymbolPriceApiModel): SymbolTimeframePriceInfo {
        return {
            symbol: apiModel.symbol,
            current: Number(apiModel.lastPrice),
            bidPrice: Number(apiModel.bid1Price),
            askPrice: Number(apiModel.ask1Price),
            open: Number(apiModel.prevPrice24h),
            close: Number(apiModel.lastPrice),
            low: Number(apiModel.lowPrice24h),
            high: Number(apiModel.highPrice24h),
            volume: Number(apiModel.volume24h),
            priceChangePercent: Number(apiModel.price24hPcnt),
            turnover: Number(apiModel.turnover24h)
        };
    }
}
