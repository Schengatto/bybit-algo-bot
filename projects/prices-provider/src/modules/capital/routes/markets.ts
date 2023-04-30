import { FastifyInstance, FastifyPluginAsync, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import fp from "fastify-plugin";
import { BrokerPlatform } from "../../../core/models/enums/providers";

import AccountService from "../services/account-service";
import MarketsService from "../services/markets-service";

// Declaration merging
declare module "fastify" {
    export interface FastifyInstance {}
}

type MarketsRequest = FastifyRequest<{
    Querystring: { searchTerm: string; epics: string };
}>;

type MarketDetailsRequest = FastifyRequest<{
    Params: { epic: string };
}>;

type MarketsCategoriesRequest = FastifyRequest<{
    Querystring: { limit?: number };
    Params: { category: string };
}>;

const CapitalMarketsRoutes: FastifyPluginAsync = async (server: FastifyInstance, options: FastifyPluginOptions) => {
    server.get(`/${BrokerPlatform.Capital}/markets`, async (request: MarketsRequest, reply: FastifyReply) => {
        const isDemo = request.headers["demo"] === "true";
        return await MarketsService.getMarkets({ queryParams: request.query, isDemo: isDemo });
    });

    server.get(`/${BrokerPlatform.Capital}/markets/:epic`, async (request: MarketDetailsRequest, reply: FastifyReply) => {
        const { epic } = request.params;
        const isDemo = request.headers["demo"] === "true";
        return await MarketsService.getMarketDetails({ epic: epic, isDemo: isDemo });
    });

    server.get(
        `/${BrokerPlatform.Capital}/markets-categories`,
        async (request: MarketsRequest, reply: FastifyReply) => {
            const isDemo = request.headers["demo"] === "true";
            return await MarketsService.getTopLevelMarketCategories(isDemo);
        }
    );

    server.get(
        `/${BrokerPlatform.Capital}/markets-categories/:category`,
        async (request: MarketsCategoriesRequest, reply: FastifyReply) => {
            const { category } = request.params;
            const isDemo = request.headers["demo"] === "true";
            return await MarketsService.getMarketsOfCategory({
                queryParams: request.query,
                isDemo: isDemo,
                nodeId: category,
            });
        }
    );
};
export default fp(CapitalMarketsRoutes);
