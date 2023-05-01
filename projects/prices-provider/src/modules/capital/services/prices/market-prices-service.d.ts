export interface CapitalMarketsInfoService {
    getHistoricalPrices: (params: GetHistoricalPricesParams) => Promise<Price[]>;
}

export enum Resolution {
    Minute = "MINUTE",
    Minute5 = "MINUTE_5",
    Minute15 = "MINUTE_15",
    Minute30 = "MINUTE_30",
    Hour = "HOUR",
    Hour4 = "HOUR_4",
    Day = "DAY",
    Week = "WEEK",
}

export interface GetHistoricalPricesParams {
    queryParams: {
        resolution: Resolution;
        max: number;
        from: string;
        to: string;
    };
    epic: string;
    isDemo: boolean;
}

export interface MarketHistoricalPricesResponse {
    prices: Price[];
    instrumentType: string;
}

export interface Price {
    snapshotTime: Date;
    snapshotTimeUTC: Date;
    openPrice: ClosePriceClass;
    closePrice: ClosePriceClass;
    highPrice: ClosePriceClass;
    lowPrice: ClosePriceClass;
    lastTradedVolume: number;
}

export interface ClosePriceClass {
    bid: number;
    ask: number;
}
