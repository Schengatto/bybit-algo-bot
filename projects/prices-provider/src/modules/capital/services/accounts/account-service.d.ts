export interface CapitalAccountService {
    getAccounts: (isDemo: boolean) => Promise<Account[]>;
}

export interface GetAccountsResponse {
    accounts: Account[];
}

export interface Account {
    accountId:   string;
    accountName: string;
    status:      string;
    accountType: string;
    preferred:   boolean;
    balance:     Balance;
    currency:    string;
}

export interface Balance {
    balance:    number;
    deposit:    number;
    profitLoss: number;
    available:  number;
}
