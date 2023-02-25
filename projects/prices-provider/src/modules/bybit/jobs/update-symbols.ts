import { getDataSource } from "../../../core/services/postgres-data-source";
import { SymbolTimeframePriceInfo } from "../models/client-models";
import { BybitTickerSymbol } from "../models/entity/BybitTickerSymbol";
import MarketHttpService from "../services/market-service";

export const updateSymbols = async () => {
    console.log("Retrieving symbols");

    const symbols = await MarketHttpService.getTickers({ category: "spot" });

    const values = symbols.map((p: SymbolTimeframePriceInfo) => {
        const dao = new BybitTickerSymbol();
        dao.symbol = p.symbol;
        dao.isEnabled = true;
        return dao;
    });

    await (await getDataSource())
        .createQueryBuilder()
        .insert()
        .into(BybitTickerSymbol)
        .values(values)
        .execute();

    console.log("Updated symbols completed");
}

updateSymbols();
