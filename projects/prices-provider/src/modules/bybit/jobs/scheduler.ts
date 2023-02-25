const schedule = require('node-schedule');
const { fork } = require('child_process');
import { orderAsc } from "../../../core/helpers/array";
import { getDataSource } from "../../../core/services/postgres-data-source";
import { BybitTickerSymbol } from "../models/entity/BybitTickerSymbol";

const updateSymbolsPrices = async () => {
    getDataSource()
        .then((dataSource) => {
            const symbolRepository = dataSource.getRepository(BybitTickerSymbol);
            symbolRepository.find({ where: { isEnabled: true }, order: { symbol: "DESC" } })
                .then(tickers => tickers.map(ticker => ticker.symbol))
                .then(orderAsc)
                .then(symbols => {
                    const worker_process = fork(`${__dirname}/update-prices.js`, [symbols]);
                    worker_process.on('close', () => console.log('update-prices job completed'));
                });;
        });
}


export const startJobs = () => {
    console.log("Scheduling jobs...");

    const checkPrices = schedule.scheduleJob('0 0 7/1 * * *', () => {
        const worker_process = fork(`${__dirname}/check-prices.js`, [10]);
        worker_process.on('close', () => console.log('check-prices job completed'));
    });


    const updatePrices = schedule.scheduleJob('0 0 */1 * * *', async () => {
        const worker_process = fork(`${__dirname}/update-symbols.js`);
        worker_process.on('close', async () => updateSymbolsPrices());
    });

    console.log("All job schedulated.");
};
