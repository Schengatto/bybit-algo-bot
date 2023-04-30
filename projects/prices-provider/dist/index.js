"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prices_1 = __importDefault(require("./modules/bybit/routes/prices"));
const wallet_1 = __importDefault(require("./modules/bybit/routes/wallet"));
const bybit_http_service_1 = __importDefault(require("./modules/bybit/services/bybit-http-service"));
const capital_http_service_1 = __importDefault(require("./modules/capital/services/capital-http-service"));
const fastify = require("fastify")({ logger: true });
// Routes
fastify.register(prices_1.default);
fastify.register(wallet_1.default);
// Configuration
var Broker;
(function (Broker) {
    Broker["Bybit"] = "bybit";
    Broker["Capital"] = "capital";
})(Broker || (Broker = {}));
if (process.argv.length > 2 && !Object.values(Broker).includes(process.argv[2])) {
    throw Error(`You must provide the BROKER. ${JSON.stringify(Object.values(Broker))}`);
}
const broker = process.argv[2];
switch (broker) {
    case Broker.Bybit:
        let bybit_apiKey = "";
        let bybit_apiSecret = "";
        if (process.argv.length >= 4) {
            bybit_apiKey = process.argv[3];
            bybit_apiSecret = process.argv[4];
        }
        else {
            const fs = require("fs");
            const bybitCredentials = fs.readFileSync(`${__dirname}/data/bybit-credentials.json`, "utf-8");
            const tokens = JSON.parse(bybitCredentials);
            bybit_apiKey = tokens.apiKey;
            bybit_apiSecret = tokens.apiSecret;
        }
        // Init services
        bybit_http_service_1.default.init({ apiKey: bybit_apiKey, apiSecret: bybit_apiSecret });
        break;
    case Broker.Capital:
        if (process.argv.length < 5) {
            throw Error("You must provide api key, username and password. E.g. node index.js capital myApiKey myUsername myPassword");
        }
        const capital_apiKey = process.argv[3];
        const capital_username = process.argv[4];
        const capital_password = process.argv[5];
        capital_http_service_1.default.init({ apiKey: capital_apiKey, identifier: capital_username, password: capital_password });
        break;
    default:
        throw Error("Invalid Broker");
}
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield fastify.listen({ port: 3000, host: "0.0.0.0" });
    }
    catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
});
start();
// start().then(() => startJobs());
