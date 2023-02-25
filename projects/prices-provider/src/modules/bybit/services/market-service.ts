import { RequestBuilder } from './../../../core/helpers/request-builder';
import { API_BASE_URL, API_VERSION_5 } from '../config/settings';
import { ResponseWrapper } from './../models/api-models';
import { SymbolTimeframePriceInfo } from './../models/client-models';
import BybitHttpService from './bybit-http-service';
import { GetKlineMapper, GetTickersMapper } from './helpers/mappers';
import { getResult } from "./helpers/validations";
import { GetHistoryQueryParams, GetKlineQueryParams, GetTickersQueryParams, GetTickersResult, MarketService } from './market-service.d';
import { getDataSource } from '../../../core/services/postgres-data-source';
import { BybitPrice } from '../models/entity/BybitPrice';
import { addHours, differenceInCalendarDays, differenceInHours, differenceInMinutes } from 'date-fns';
import { orderAscByProperty, orderDescByProperty } from '../../../core/helpers/array';
import { LessThanOrEqual, MoreThan, MoreThanOrEqual } from 'typeorm';

const PATH_ROOT = "market";

class MarketHttpService implements MarketService {
    async getTickers(params: GetTickersQueryParams): Promise<SymbolTimeframePriceInfo[]> {

        const request = new RequestBuilder()
            .withURL(`${API_BASE_URL}/${API_VERSION_5}/${PATH_ROOT}/tickers`)
            .withParams({ ...params })
            .build();

        return BybitHttpService.get<ResponseWrapper<GetTickersResult>>(request)
            .then(res => res.data)
            .then(getResult)
            .then((data: GetTickersResult) => data.list.map(GetTickersMapper.mapToClientModel));
    }

    async getKline(params: GetKlineQueryParams): Promise<SymbolTimeframePriceInfo[]> {
        const request = new RequestBuilder()
            .withURL(`${API_BASE_URL}/${API_VERSION_5}/${PATH_ROOT}/kline`)
            .withParams({ ...params })
            .build();

        return BybitHttpService.get<ResponseWrapper<GetTickersResult>>(request)
            .then(res => res.data)
            .then(getResult)
            .then(GetKlineMapper.mapToClientModel);

    }

    async getHistoricalPrices(params: GetHistoryQueryParams): Promise<SymbolTimeframePriceInfo[]> {
        const dataSource = await getDataSource();
        const priceRepository = dataSource.getRepository(BybitPrice);
        const now = new Date().getTime();

        const storedHistoricalPrices =  await priceRepository
            .createQueryBuilder('price')
            .where('price.symbol = :symbol', { symbol: params.symbol })
            .andWhere('price.startTime >= :from', { from: params.start ?? 0 })
            .andWhere('price.startTime <= :to', { to: params.end ?? new Date().getTime() })
            .getMany();

        const getPercentDelta = (from: number, to: number): number => Number(((to - from) / from * 100).toFixed(4));
        let result: SymbolTimeframePriceInfo[] = storedHistoricalPrices.map(p => ({ startTime: Number(p.startTime), symbol: params.symbol, open: Number(p.open), close: Number(p.close), high: Number(p.high), low: Number(p.low), volume: Number(p.volume), priceChangePercent: getPercentDelta(p.open, p.close) }))
        result = orderDescByProperty(result, "startTime");

        let lastStoredDate = Number(result[0].startTime);


        let delta = differenceInHours(now, lastStoredDate);
        const DEFAULT_CHUNK_SIZE = 200;
        while (delta > 0) {
            const start = addHours(new Date(lastStoredDate), 1).getTime();
            const prices = await this.getKline({ category: "spot", symbol: params.symbol, interval: "60", start, limit: DEFAULT_CHUNK_SIZE });

            if (!prices.length) {
                lastStoredDate = addHours(start, DEFAULT_CHUNK_SIZE).getTime();
                delta = differenceInHours(now, lastStoredDate);
                continue;
            }

            const orderedPrices: SymbolTimeframePriceInfo[] = orderDescByProperty(prices, "startTime");
            result.unshift(...orderedPrices);

            lastStoredDate = Number(orderedPrices[orderedPrices.length - 1].startTime);
            delta = differenceInHours(now, lastStoredDate);
        }

        return result;
    }
}

export default new MarketHttpService();