import { PostgresDataSource } from "./core/services/postgres-data-source";
import { startJobs } from "./modules/bybit/jobs/scheduler";
import BybitPricesRoutes from "./modules/bybit/routes/prices";
import BybitWalletRoutes from "./modules/bybit/routes/wallet";
import BybitHttpService from "./modules/bybit/services/bybit-http-service";

const fastify = require('fastify')({ logger: true })

// Routes
fastify.register(BybitPricesRoutes);
fastify.register(BybitWalletRoutes);

// Configuration
let apiKey = "";
let apiSecret = "";
if (process.argv.length >= 3) {
    apiKey = process.argv[2];
    apiSecret = process.argv[3];
} else {
    const fs = require('fs');
    const bybitCredentials = fs.readFileSync(`${__dirname}/data/bybit-credentials.json`, "utf-8");
    const tokens = JSON.parse(bybitCredentials);
    apiKey = tokens.apiKey;
    apiSecret = tokens.apiSecret;
}

// Init services
BybitHttpService.init({ apiKey, apiSecret });

const start = async () => {
    try {
        await fastify.listen({ port: 3000, host: '0.0.0.0' })
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

start().then(() => startJobs());
