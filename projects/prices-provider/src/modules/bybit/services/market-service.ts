import { RequestBuilder } from './../../../core/helpers/request-builder';
import { API_BASE_URL, API_VERSION_5 } from '../config/settings';
import { ResponseWrapper } from './../models/api-models';
import { SymbolTimeframePriceInfo } from './../models/client-models';
import BybitHttpService from './bybit-http-service';
import { GetKlineMapper, GetTickersMapper } from './helpers/mappers';
import { getResult } from "./helpers/validations";
import { GetKlineQueryParams, GetTickersQueryParams, GetTickersResult, MarketService } from './market-service.d';

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
}

export default new MarketHttpService();