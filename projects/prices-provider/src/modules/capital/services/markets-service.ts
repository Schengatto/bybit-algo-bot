import { FastifyRequest } from "fastify";
import { RequestBuilder } from "../../../core/helpers/request-builder";
import { API_BASE_URL, API_VERSION_1, TESTNET_API_BASE_URL } from "../config/settings";
import CapitalHttpService from "./capital-http-service";
import { CapitalMarketsService, GetMarketsResponse, Market, GetMarketsParams } from "./markets-service.d";

const baseUrl = (isDemo: boolean) => (isDemo ? TESTNET_API_BASE_URL : API_BASE_URL);

class MarketsHttpService implements CapitalMarketsService {
    async getMarketsDetails(params: GetMarketsParams): Promise<Market[]> {
        const request = new RequestBuilder()
            .withURL(`${baseUrl(params.isDemo)}/${API_VERSION_1}/markets`)
            .withParams(params.queryParams)
            .build();

        return CapitalHttpService.get<GetMarketsResponse>(request)
            .then((res) => res.data)
            .then((data: GetMarketsResponse) => data.markets);
    }
}

export default new MarketsHttpService();
