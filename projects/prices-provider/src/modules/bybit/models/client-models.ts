export interface SymbolPriceInfo {
    symbol: string;
    current: number;
    bidPrice?: number;
    askPrice?: number;
}

export interface SymbolTimeframePriceInfo extends SymbolPriceInfo {
    startTime: number;
    open: number;
    close: number;
    low: number;
    high: number;
    volume: number;
    turnover: number;
    priceChangePercent: number;
}