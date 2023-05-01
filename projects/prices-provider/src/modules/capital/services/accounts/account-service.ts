import { RequestBuilder } from "../../../../core/helpers/request-builder";
import { API_BASE_URL, API_VERSION_1, TESTNET_API_BASE_URL } from "../../config/settings";
import CapitalHttpService from "../capital-http-service";
import {Account, CapitalAccountService, GetAccountsResponse} from "../accounts/account-service.d";

const baseUrl = (isDemo: boolean) =>  isDemo ? TESTNET_API_BASE_URL : API_BASE_URL;

class AccountHttpService implements CapitalAccountService {

    async getAccounts(isDemo: boolean): Promise<Account[]> {
        const request = new RequestBuilder()
            .withURL(`${baseUrl(isDemo)}/${API_VERSION_1}/accounts`)
            .build();

        return CapitalHttpService
            .get<GetAccountsResponse>(request)
            .then((res) => res.data)
            .then((data: GetAccountsResponse) => data.accounts);
    }
}

export default new AccountHttpService();
