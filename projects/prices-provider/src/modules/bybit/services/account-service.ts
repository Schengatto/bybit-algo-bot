import { RequestBuilder } from './../../../core/helpers/request-builder';
import { API_BASE_URL, API_VERSION_3 } from '../config/settings';
import { ResponseWrapper } from './../models/api-models';
import { AccountService, BybitUserWallet, GetWalletBalanceQueryParams } from './account-service.d';
import { getResult } from "./helpers/validations";
import BybitHttpService from './bybit-http-service';

class AccountHttpService implements AccountService {

    /** https://bybit-exchange.github.io/docs/v5/account/wallet-balance */
    async getWalletBalance(params: GetWalletBalanceQueryParams): Promise<BybitUserWallet[]> {

        const request = new RequestBuilder()
            .withURL(`${API_BASE_URL}/spot/${API_VERSION_3}/private/account`)
            .withParams({ ...params })
            .build();

        return BybitHttpService.get<ResponseWrapper<any>>(request)
            .then(res => res.data)
            .then(getResult)
            .then((data: any) => data.balances);
    }
}


export default new AccountHttpService();