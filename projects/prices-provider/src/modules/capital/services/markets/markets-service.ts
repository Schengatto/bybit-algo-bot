import { FastifyRequest } from "fastify";
import { RequestBuilder } from "../../../../core/helpers/request-builder";
import { API_BASE_URL, API_VERSION_1, TESTNET_API_BASE_URL } from "../../config/settings";
import CapitalHttpService from "../capital-http-service";
import {
    CapitalMarketsService,
    GetMarketsResponse,
    Market,
    GetMarketsParams,
    MarketCategory,
    GetTopLevelMarketCategoriesResponse as GetMarketNodesResponse,
    GetMarketsOfCategory,
    GetMarketDetailsParams,
    MarketDetails,
} from "./markets-service.d";

const baseUrl = (isDemo: boolean) => (isDemo ? TESTNET_API_BASE_URL : API_BASE_URL);

class MarketsHttpService implements CapitalMarketsService {
    async getMarkets(params: GetMarketsParams): Promise<Market[]> {
        const request = new RequestBuilder()
            .withURL(`${baseUrl(params.isDemo)}/${API_VERSION_1}/markets`)
            .withParams(params.queryParams)
            .build();

        return CapitalHttpService.get<GetMarketsResponse>(request)
            .then((res) => res.data)
            .then((data: GetMarketsResponse) => data.markets);
    }

    async getMarketDetails(params: GetMarketDetailsParams): Promise<MarketDetails> {
        const request = new RequestBuilder()
        .withURL(`${baseUrl(params.isDemo)}/${API_VERSION_1}/markets/${params.epic}`)
        .build();

    return CapitalHttpService.get<MarketDetails>(request)
        .then((res) => res.data)
    }

    async getTopLevelMarketCategories(isDemo: boolean): Promise<MarketCategory[]> {
        const request = new RequestBuilder()
        .withURL(`${baseUrl(isDemo)}/${API_VERSION_1}/marketnavigation`)
        .build();

    return CapitalHttpService.get<GetMarketNodesResponse>(request)
        .then((res) => res.data)
        .then((data: GetMarketNodesResponse) => data.nodes);
    }

    async getMarketsOfCategory(params: GetMarketsOfCategory): Promise<MarketCategory[]> {
        const request = new RequestBuilder()
        .withURL(`${baseUrl(params.isDemo)}/${API_VERSION_1}/marketnavigation/${params.nodeId}`)
        .withParams(params.queryParams)
        .build();

    return CapitalHttpService.get<GetMarketNodesResponse>(request)
        .then((res) => res.data)
        .then((data: GetMarketNodesResponse) => data.nodes);
    }
}

export default new MarketsHttpService();
