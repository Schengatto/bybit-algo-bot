export interface CapitalMarketsService {
    getMarketsDetails: (params: GetMarketsParams) => Promise<Market[]>;
}

export interface GetMarketsParams {
    queryParams: {
        searchTerm: string;
        epics: string;
    }
    isDemo: boolean;
}

export interface GetMarketsResponse {
    markets: Market[];
}

export interface Market {
    delayTime:                number;
    epic:                     string;
    netChange?:               number;
    lotSize:                  number;
    expiry:                   string;
    instrumentType:           string;
    instrumentName:           string;
    high?:                    number;
    low?:                     number;
    percentageChange?:        number;
    updateTime:               Date;
    updateTimeUTC:            Date;
    bid:                      number;
    offer:                    number;
    streamingPricesAvailable: boolean;
    marketStatus:             string;
    scalingFactor:            number;
}