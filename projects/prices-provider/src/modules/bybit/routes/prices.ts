import { FastifyInstance, FastifyPluginAsync, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import fp from 'fastify-plugin';
import { CryptoExchanger } from './../../../core/models/enums/providers';
import { GetKlineQueryParams, GetTickersQueryParams } from './../services/market-service.d';

import MarketHttpService from "../services/market-service";

// Declaration merging
declare module 'fastify' {
    export interface FastifyInstance { }
}

type DailyPriceRequest = FastifyRequest<{
    Querystring: GetTickersQueryParams
}>;

type HistoricalPriceRequest = FastifyRequest<{
    Querystring: GetKlineQueryParams
}>;

const BybitPricesRoutes: FastifyPluginAsync = async (server: FastifyInstance, options: FastifyPluginOptions) => {

    // Prices
    server.get(`/${CryptoExchanger.Bybit}/prices/daily`, async (request: DailyPriceRequest, reply: FastifyReply) => {
        request.query.category = request.query.category || "spot";
        return await MarketHttpService.getTickers(request.query);
    });

    server.get(`/${CryptoExchanger.Bybit}/prices/history`, async (request: HistoricalPriceRequest, reply: FastifyReply) => {
        request.query.category = request.query.category || "spot";
        return await MarketHttpService.getKline(request.query);
    });
};
export default fp(BybitPricesRoutes);