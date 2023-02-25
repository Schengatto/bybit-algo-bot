import "reflect-metadata";
import { DataSource } from "typeorm";
import { BybitPrice } from "../../modules/bybit/models/entity/BybitPrice";
import { BybitTickerSymbol } from "../../modules/bybit/models/entity/BybitTickerSymbol";

export const PostgresDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "demo",
    database: "crypto_algo_trading",
    entities: [BybitPrice, BybitTickerSymbol],
    synchronize: true,
    logging: false,
});

PostgresDataSource.initialize()
    .then(async () => {
        console.log("Connection initialized with database...");
    })
    .catch((error) => console.log(error));

export const getDataSource = (delay = 2000): Promise<DataSource> => {
    if (PostgresDataSource.isInitialized) return Promise.resolve(PostgresDataSource);

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (PostgresDataSource.isInitialized) resolve(PostgresDataSource);
            else reject("Failed to create connection with database");
        }, delay);
    });
};