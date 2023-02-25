
type AccountType = "UNIFIED" | "CONTRACT";


export interface AccountService {
    getWalletBalance: (params: GetWalletBalanceQueryParams) => Promise<BybitUserWallet[]>;
}

export interface GetWalletBalanceQueryParams {
    accountType: AccountType;
    coin?: string;
}

export interface GetWalletBalanceResult {
    list: BybitUserWallet[];
}

export interface BybitUserWallet {
    totalEquity: string;
    accountIMRate: string;
    totalMarginBalance: string;
    totalInitialMargin: string;
    accountType: AccountType;
    totalAvailableBalance: string;
    accountMMRate: string;
    totalPerpUPL: string;
    totalWalletBalance: string;
    totalMaintenanceMargin: string;
    coin: Coin[];
}

export interface Coin {
    availableToBorrow: string;
    accruedInterest: string;
    availableToWithdraw: string;
    totalOrderIM: string;
    equity: string;
    totalPositionMM: string;
    usdValue: string;
    unrealisedPnl: string;
    borrowAmount: string;
    totalPositionIM: string;
    walletBalance: string;
    cumRealisedPnl: string;
    coin: string;
}