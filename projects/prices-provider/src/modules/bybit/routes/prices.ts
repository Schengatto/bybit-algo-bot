import { FastifyInstance, FastifyPluginAsync, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import fp from 'fastify-plugin';
import { BrokerPlatform } from './../../../core/models/enums/providers';
import { GetHistoryQueryParams, GetKlineQueryParams, GetTickersQueryParams } from './../services/market-service.d';

import MarketHttpService from "../services/market-service";

// Declaration merging
declare module 'fastify' {
    export interface FastifyInstance { }
}

type DailyPriceRequest = FastifyRequest<{
    Querystring: GetTickersQueryParams
}>;

type KlinePriceRequest = FastifyRequest<{
    Querystring: GetKlineQueryParams
}>;

type HistoricalPriceRequest = FastifyRequest<{
    Querystring: GetHistoryQueryParams
}>;

const BybitPricesRoutes: FastifyPluginAsync = async (server: FastifyInstance, options: FastifyPluginOptions) => {

    // Prices
    server.get(`/${BrokerPlatform.Bybit}/prices/daily`, async (request: DailyPriceRequest, reply: FastifyReply) => {
        request.query.category = request.query.category || "spot";
        return await MarketHttpService.getTickers(request.query);
    });

    server.get(`/${BrokerPlatform.Bybit}/prices/kline`, async (request: KlinePriceRequest, reply: FastifyReply) => {
        request.query.category = request.query.category || "spot";
        return await MarketHttpService.getKline(request.query);
    });

    server.get(`/${BrokerPlatform.Bybit}/prices/history`, async (request: HistoricalPriceRequest, reply: FastifyReply) => {
        return await MarketHttpService.getHistoricalPrices(request.query);
    });
};
export default fp(BybitPricesRoutes);