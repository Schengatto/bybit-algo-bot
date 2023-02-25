import crypto from 'crypto';
import { RequestInfo } from "../../../core/helpers/request-builder";
import { Dictionary } from "../../../core/models";
import { AbstractHttpService } from "../../../core/services/http-service";

class BybitHttpService extends AbstractHttpService {

    private _apiKey: string = "";
    private _apiSecret: string = "";

    init(config: any): void {
        this._apiKey = config.apiKey;
        this._apiSecret = config.apiSecret;
    }

    getAuthenticationHeaders(requestInfo: RequestInfo): Dictionary<string> {
        return this.createAuthenticationHeaders(requestInfo.parameters);
    }

    private createAuthenticationHeaders(params: Object): Dictionary<string> {
        const hasValidValue = (field: string): boolean => params[field] !== null && params[field] !== undefined && params[field] !== "";
        const paramsAsString = Object.keys(params)
            .filter(hasValidValue)
            .map(key => `${key}=${params[key]}`)
            .join("&");

        const recvWindow = "5000";
        const timestamp = Date.now().toString();
        const sign = this.getSignature(paramsAsString, timestamp, recvWindow);
        return {
            'X-BAPI-SIGN-TYPE': '2',
            'X-BAPI-SIGN': sign,
            'X-BAPI-API-KEY': this._apiKey,
            'X-BAPI-TIMESTAMP': timestamp,
            'X-BAPI-RECV-WINDOW': recvWindow,
            "cdn-request-id": "test" + timestamp,
            'Content-Type': 'application/json; charset=utf-8'
        }
    }

    private getSignature(parameters, timestamp, recvWindow): string {
        const seed = timestamp + this._apiKey + recvWindow + parameters;
        return crypto.createHmac('sha256', this._apiSecret)
            .update(seed)
            .digest('hex');
    }
}

export default new BybitHttpService();