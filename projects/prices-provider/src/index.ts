import { BrokerPlatform } from "./core/models/enums/providers";
import { startJobs } from "./modules/bybit/jobs/scheduler";
import BybitPricesRoutes from "./modules/bybit/routes/prices";
import BybitWalletRoutes from "./modules/bybit/routes/wallet";
import BybitHttpService from "./modules/bybit/services/bybit-http-service";
import capitalHttpService from "./modules/capital/services/capital-http-service";
import CapitalAccountRoutes from "./modules/capital/routes/accounts";
import CapitalMarketsRoutes from "./modules/capital/routes/markets";

const fastify = require("fastify")({ logger: true });

if (process.argv.length > 2 && !(Object.values(BrokerPlatform) as string[]).includes(process.argv[2])) {
    throw Error(`You must provide the BROKER. ${JSON.stringify(Object.values(BrokerPlatform))}`);
}

const broker: BrokerPlatform = process.argv[2] as BrokerPlatform;
switch (broker) {
    case BrokerPlatform.Bybit:
        let bybit_apiKey = "";
        let bybit_apiSecret = "";
        if (process.argv.length >= 4) {
            bybit_apiKey = process.argv[3];
            bybit_apiSecret = process.argv[4];
        } else {
            const fs = require("fs");
            const bybitCredentials = fs.readFileSync(`${__dirname}/data/bybit-credentials.json`, "utf-8");
            const tokens = JSON.parse(bybitCredentials);
            bybit_apiKey = tokens.apiKey;
            bybit_apiSecret = tokens.apiSecret;
        }
        // Init services
        BybitHttpService.init({ apiKey: bybit_apiKey, apiSecret: bybit_apiSecret });
        break;
    case BrokerPlatform.Capital:
        if (process.argv.length < 5) {
            throw Error(
                "You must provide api key, username and password. E.g. node index.js capital myApiKey myUsername myPassword"
            );
        }
        const capital_apiKey = process.argv[3];
        const capital_username = process.argv[4];
        const capital_password = process.argv[5];
        capitalHttpService.init({ apiKey: capital_apiKey, identifier: capital_username, password: capital_password });
        break;
    default:
        throw Error("Invalid Broker");
}

const start = async () => {
    try {
        await fastify.listen({ port: 3000, host: "0.0.0.0" });
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

// Routes
fastify.register(BybitPricesRoutes);
fastify.register(BybitWalletRoutes);
fastify.register(CapitalAccountRoutes);
fastify.register(CapitalMarketsRoutes);

start();
// start().then(() => startJobs());
