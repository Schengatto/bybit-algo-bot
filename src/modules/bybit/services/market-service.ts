import { RequestBuilder } from './../../../core/helpers/request-builder';
import HttpService from './../../../core/services/http-service';
import { API_BASE_URL, API_VERSION_5 } from './../../config/settings';
import { ResponseWrapper } from './../models/api-models';
import { SymbolTimeframePriceInfo } from './../models/client-models';
import { GetTickersMapper } from './helpers/mappers';
import { getResult } from "./helpers/validations";
import { GetTickersQueryParams, GetTickersResult } from './market-service.d';

const PATH_ROOT = "market";

class MarketService {
    async getTickers(params: GetTickersQueryParams): Promise<SymbolTimeframePriceInfo[]> {

        const request = new RequestBuilder()
            .withURL(`${API_BASE_URL}/${API_VERSION_5}/${PATH_ROOT}/tickers`)
            .withParams({ ...params })
            .build();

        return HttpService.get<ResponseWrapper<GetTickersResult>>(request)
            .then(res => res.data)
            .then(getResult)
            .then((data: GetTickersResult) => data.list.map(GetTickersMapper.mapToClientModel));
    }
}


export default new MarketService();