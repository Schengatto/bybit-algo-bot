import { FastifyInstance, FastifyPluginAsync, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import fp from "fastify-plugin";
import { BrokerPlatform } from "../../../core/models/enums/providers";

import MarketsInfoService from "../services/prices/market-prices-service";
import { Resolution } from "../services/prices/market-prices-service.d";

// Declaration merging
declare module "fastify" {
    export interface FastifyInstance {}
}

type MarketHistoricalPricesRequest = FastifyRequest<{
    Querystring: { resolution: Resolution; max: number; from: string; to: string };
    Params: { epic: string };
}>;

const CapitalMarketPricesRoutes: FastifyPluginAsync = async (server: FastifyInstance, options: FastifyPluginOptions) => {
    server.get(
        `/${BrokerPlatform.Capital}/markets-info/price/:epic`,
        async (request: MarketHistoricalPricesRequest, reply: FastifyReply) => {
            const { epic } = request.params;
            const isDemo = request.headers["demo"] === "true";
            return await MarketsInfoService.getHistoricalPrices({
                queryParams: request.query,
                isDemo: isDemo,
                epic: epic,
            });
        }
    );
};
export default fp(CapitalMarketPricesRoutes);
