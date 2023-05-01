import { FastifyInstance, FastifyPluginAsync, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import fp from 'fastify-plugin';
import { BrokerPlatform } from "../../../core/models/enums/providers";

import AccountService from "../services/accounts/account-service";

// Declaration merging
declare module 'fastify' {
    export interface FastifyInstance { }
}

const CapitalAccountsRoutes: FastifyPluginAsync = async (server: FastifyInstance, options: FastifyPluginOptions) => {

    server.get(`/${BrokerPlatform.Capital}/accounts`, async (request: FastifyRequest, reply: FastifyReply) => {
        const isDemo = request.headers["demo"] === "true";
        return await AccountService.getAccounts(isDemo);
    });
};
export default fp(CapitalAccountsRoutes);