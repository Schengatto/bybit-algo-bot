import {
    CapitalMarketsInfoService,
    GetHistoricalPricesParams,
    MarketHistoricalPricesResponse,
    Price,
} from "./market-prices-service.d";
import { API_BASE_URL, API_VERSION_1, TESTNET_API_BASE_URL } from "../../config/settings";
import { RequestBuilder } from "../../../../core/helpers/request-builder";
import capitalHttpService from "../capital-http-service";

const baseUrl = (isDemo: boolean) => (isDemo ? TESTNET_API_BASE_URL : API_BASE_URL);

class MarketsInfoHttpService implements CapitalMarketsInfoService {
    async getHistoricalPrices(params: GetHistoricalPricesParams): Promise<Price[]> {
        const request = new RequestBuilder()
            .withURL(`${baseUrl(params.isDemo)}/${API_VERSION_1}/prices/${params.epic}`)
            .build();

        return capitalHttpService
            .get<MarketHistoricalPricesResponse>(request)
            .then((res) => res.data)
            .then((data: MarketHistoricalPricesResponse) => data.prices);
    }
}

export default new MarketsInfoHttpService();
