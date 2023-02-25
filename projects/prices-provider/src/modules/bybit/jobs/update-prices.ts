import { addHours, differenceInCalendarDays } from "date-fns";
import { orderAscByProperty } from "../../../core/helpers/array";
import { getDataSource } from "../../../core/services/postgres-data-source";
import { SymbolTimeframePriceInfo } from "../models/client-models";
import { BybitPrice } from "../models/entity/BybitPrice";
import MarketHttpService from "../services/market-service";

const DEFAULT_CHUNK_SIZE = 200;
const DEFAULT_STARTING_DATE = new Date("2022-01-01").getTime();
const DEFAULT_INTERVAL = "60";

const brokenSymbols = new Set<string>();

export const updatePrices = async (symbol: string) => {
    console.log("Downloading prices for symbol " + symbol);
    const dataSource = await getDataSource();
    const priceRepository = dataSource.getRepository(BybitPrice);

    const oneHourAgo = addHours(new Date(), -1).getTime();
    let lastStoredDate = Number((await priceRepository.findOne({ where: { symbol }, order: { startTime: "DESC" } }))?.startTime || DEFAULT_STARTING_DATE);
    let delta = differenceInCalendarDays(oneHourAgo, lastStoredDate);

    while (delta > 0) {
        const start = addHours(new Date(lastStoredDate), 1).getTime();
        const prices = await MarketHttpService.getKline({ category: "spot", symbol, interval: DEFAULT_INTERVAL, start, limit: DEFAULT_CHUNK_SIZE });

        if (!prices.length) {
            lastStoredDate = addHours(start, DEFAULT_CHUNK_SIZE).getTime();
            delta = differenceInCalendarDays(oneHourAgo, lastStoredDate);
            continue;
        }

        const orderedPrices = orderAscByProperty(prices, "startTime");

        const values = orderedPrices.map((p: SymbolTimeframePriceInfo) => {
            const dao = new BybitPrice();
            dao.symbol = p.symbol;
            dao.startTime = p.startTime;
            dao.open = p.open;
            dao.close = p.close;
            dao.low = p.low;
            dao.high = p.high;
            dao.volume = p.volume;
            return dao;
        });

        // Bulk insert all prices
        await dataSource
            .createQueryBuilder()
            .insert()
            .into(BybitPrice)
            .values(values)
            .execute();

        lastStoredDate = orderedPrices[orderedPrices.length - 1].startTime;
        delta = differenceInCalendarDays(oneHourAgo, lastStoredDate);
    }
}

const updateSymbolPrices = (index, symbols) =>
    setTimeout(async () => {
        if (symbols.length > index) {
            try {
                await updatePrices(symbols[index])
            } catch (error) {
                console.error(`There was an error updating prices for symbol ${symbols[index]}`);
                brokenSymbols.add(symbols[index]);
            }
            index++;
            updateSymbolPrices(index, symbols);
        } else {
            console.error(`Found ${brokenSymbols.size} errors: ${brokenSymbols}`);
        }
    }, 0);


if (process.argv.length < 2) {
    throw new Error("You must provide a symbol");
} else {
    const symbols: string[] = process.argv[2].split(",");
    updateSymbolPrices(0, symbols);
}

