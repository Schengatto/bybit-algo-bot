import { FastifyInstance, FastifyPluginAsync, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import fp from 'fastify-plugin';
import { BrokerPlatform } from "../../../core/models/enums/providers";

import AccountService from "../services/account-service";
import { GetWalletBalanceQueryParams } from "../services/account-service.d";

// Declaration merging
declare module 'fastify' {
    export interface FastifyInstance { }
}


type AccountWalletBalanceRequest = FastifyRequest<{
    Querystring: GetWalletBalanceQueryParams
}>;

const BybitWalletRoutes: FastifyPluginAsync = async (server: FastifyInstance, options: FastifyPluginOptions) => {

    server.get(`/${BrokerPlatform.Bybit}/account/wallet`, async (request: AccountWalletBalanceRequest, reply: FastifyReply) => {
        return await AccountService.getWalletBalance(request.query);
    });
};
export default fp(BybitWalletRoutes);