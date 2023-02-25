import { SymbolTimeframePriceInfo } from './../models/client-models';
type CategoryType = "spot" | "linear" | "inverse" | "option";
type KlineInterval = "1" | "3" | "5" | "15" | "30" | "60" | "120" | "240" | "360" | "720" | "D" | "M" | "W";

export interface MarketService {
    getTickers: (params: GetTickersQueryParams) => Promise<SymbolTimeframePriceInfo[]>;
    getKline: (params: GetKlineQueryParams) => Promise<SymbolTimeframePriceInfo[]>;
}

/**
 *  Query the latest price snapshot, best bid/ask price, and trading volume in the last 24 hours.
 *  category: Product type. spot,linear,inverse,option
 *  symbol: Symbol name (eg: BTCUSDT)
 *  baseCoin: Base coin. For option only
 *  expDate: Expiry date. e.g., 25DEC22. For option only
 */
export interface GetTickersQueryParams {
    category: CategoryType;
    symbol?: string;
    baseCoin?: string;
    expDate?: string;
}

export interface GetTickersResult {
    category: CategoryType;
    list: SymbolPriceApiModel[];
}

export interface SymbolPriceApiModel {
    symbol: string;
    bid1Price: string;
    bid1Size: string;
    ask1Price: string;
    ask1Size: string;
    lastPrice: string;
    prevPrice24h: string;
    price24hPcnt: string;
    highPrice24h: string;
    lowPrice24h: string;
    turnover24h: string;
    volume24h: string;
}

/**
 *  Query the kline data. Charts are returned in groups based on the requested interval.
 *  category: Product type. spot,linear,inverse,option
 *  symbol: Symbol name (eg: BTCUSDT)
 *  interval: Kline interval. 1,3,5,15,30,60,120,240,360,720,D,M,W
 *  start: The start timestamp (ms)
 *  end: The end timestamp (ms)
 *  limit: Limit for data size per page. [1, 200]. Default: 200
 */
export interface GetKlineQueryParams {
    category: CategoryType;
    symbol?: string;
    interval?: KlineInterval;
    start?: number | string;
    end?: number | string;
    limit?: number | string;
}

export interface GetKlineResult {
    symbol: string;
    category: CategoryType;
    list: string[][];
}
