import { FastifyInstance, FastifyPluginAsync, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import fp from 'fastify-plugin';
import { BrokerPlatform } from "../../../core/models/enums/providers";

import AccountService from "../services/account-service";
import MarketsService from "../services/markets-service";

// Declaration merging
declare module 'fastify' {
    export interface FastifyInstance { }
}

type MarketsDetailsRequest = FastifyRequest<{
    Querystring: {searchTerm: string, epics: string}
}>;

const CapitalMarketsRoutes: FastifyPluginAsync = async (server: FastifyInstance, options: FastifyPluginOptions) => {

    server.get(`/${BrokerPlatform.Capital}/markets`, async (request: MarketsDetailsRequest, reply: FastifyReply) => {
        const isDemo = request.headers["demo"] === "true";
        return await MarketsService.getMarketsDetails({queryParams: request.query, isDemo: isDemo});
    });
};
export default fp(CapitalMarketsRoutes);