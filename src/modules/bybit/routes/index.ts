import { FastifyInstance, FastifyPluginAsync, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import fp from 'fastify-plugin';
import { GetTickersQueryParams } from './../services/market-service.d';

import MarketService from "../services/market-service";

// Declaration merging
declare module 'fastify' {
    export interface FastifyInstance { }
}

const ROOT = "/bybit";

type PriceRequest = FastifyRequest<{
    Querystring: GetTickersQueryParams
}>;


const BybitRoute: FastifyPluginAsync = async (server: FastifyInstance, options: FastifyPluginOptions) => {

    server.get(`${ROOT}/prices/daily`, async (request: PriceRequest, reply: FastifyReply) => {
        request.query.category = request.query.category || "spot";
        return await MarketService.getTickers(request.query);
    });
};
export default fp(BybitRoute);