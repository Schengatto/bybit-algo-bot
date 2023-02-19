type CategoryType = "spot" | "linear" | "inverse" | "option";

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