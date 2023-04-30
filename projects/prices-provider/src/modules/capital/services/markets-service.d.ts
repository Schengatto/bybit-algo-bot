export interface CapitalMarketsService {
    getMarkets: (params: GetMarketsParams) => Promise<Market[]>;
    getMarketDetails: (params: GetMarketDetailsParams) => Promise<MarketDetails>;
    getTopLevelMarketCategories: (isDemo: boolean) => Promise<MarketCategory[]>;
    getMarketsOfCategory: (params: GetMarketsOfCategory) => Promise<MarketCategory[]>;
}

export interface GetMarketsParams {
    queryParams: {
        searchTerm: string;
        epics: string;
    };
    isDemo: boolean;
}

export interface GetMarketDetailsParams {
    epic: string;
    isDemo: boolean;
}


export interface GetMarketsOfCategory {
    queryParams: {
        limit?: number;
    };
    nodeId: string;
    isDemo: boolean;
}

export interface GetMarketsResponse {
    markets: Market[];
}

export interface Market {
    delayTime: number;
    epic: string;
    netChange?: number;
    lotSize: number;
    expiry: string;
    instrumentType: string;
    instrumentName: string;
    high?: number;
    low?: number;
    percentageChange?: number;
    updateTime: Date;
    updateTimeUTC: Date;
    bid: number;
    offer: number;
    streamingPricesAvailable: boolean;
    marketStatus: string;
    scalingFactor: number;
}

export interface GetTopLevelMarketCategoriesResponse {
    nodes: MarketCategory[];
}

export interface MarketCategory {
    id: string;
    name: string;
}


export interface MarketDetails {
    instrument:   Instrument;
    dealingRules: DealingRules;
    snapshot:     Snapshot;
}

export interface DealingRules {
    minStepDistance:               MaxStopOrLimitDistance;
    minDealSize:                   MaxStopOrLimitDistance;
    minControlledRiskStopDistance: MaxStopOrLimitDistance;
    minNormalStopOrLimitDistance:  MaxStopOrLimitDistance;
    maxStopOrLimitDistance:        MaxStopOrLimitDistance;
    marketOrderPreference:         string;
    trailingStopsPreference:       string;
}

export interface MaxStopOrLimitDistance {
    unit:  string;
    value: number;
}

export interface Instrument {
    epic:                     string;
    expiry:                   string;
    name:                     string;
    lotSize:                  number;
    type:                     string;
    controlledRiskAllowed:    boolean;
    streamingPricesAvailable: boolean;
    currency:                 string;
    marginFactor:             number;
    marginFactorUnit:         string;
    openingHours:             OpeningHours;
    country:                  string;
}

export interface OpeningHours {
    mon:  string[];
    tue:  string[];
    wed:  string[];
    thu:  string[];
    fri:  string[];
    sat:  any[];
    sun:  string[];
    zone: string;
}

export interface Snapshot {
    marketStatus:        string;
    netChange:           number;
    percentageChange:    number;
    updateTime:          Date;
    delayTime:           number;
    bid:                 number;
    offer:               number;
    high:                number;
    low:                 number;
    decimalPlacesFactor: number;
    scalingFactor:       number;
}
