import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, CancelTokenSource, InternalAxiosRequestConfig } from "axios";
import {
    buildUrlQueryParams,
    getUrlWithoutQueryParams,
    isCancelEvent
} from "../helpers/http";
import { RequestInfo } from "../helpers/request-builder";

export interface GetFileResponse {
    fileName: string;
    fileData: Blob;
}

type PendingRequests = Map<string, CancelTokenSource>;
let _pendingRequests: PendingRequests = new Map<string, CancelTokenSource>();

export class HttpService {
    axios: AxiosInstance;
    cancelTokenSource?: CancelTokenSource;

    constructor() {
        this.cancelTokenSource = axios.CancelToken.source();
        this.axios = axios.create({
            cancelToken: this.cancelTokenSource.token,
        });

        this.axios.interceptors.request.use(this.onRequestIntercept, this.onRequestError);
        this.axios.interceptors.response.use(this.handleSuccessResponse, this.handleErrorResponse);
    }

    init(): void {
    }

    static isFailResponse(data: any): boolean {
        return typeof data === "object"
            && "code" in data
            && "message" in data;
    }

    set pendingRequests(pendingRequests: Map<string, CancelTokenSource>) {
        _pendingRequests = pendingRequests;
    }

    onRequestIntercept(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
        const tokenSource = axios.CancelToken.source();
        if (config.method === "get" && config.url) {
            const requestUrl = getUrlWithoutQueryParams(config.url);
            const previousRequestCancelTokenSource = _pendingRequests.get(requestUrl);
            if (previousRequestCancelTokenSource) {
                previousRequestCancelTokenSource.cancel();
            }
            _pendingRequests.set(requestUrl, tokenSource);
        }
        return { ...config, data: config.data, cancelToken: tokenSource.token };
    }

    onRequestError(error: any): Promise<any> {
        return Promise.reject(error);
    }

    handleSuccessResponse(res: AxiosResponse) {
        if (res.config.url) {
            _pendingRequests.delete(getUrlWithoutQueryParams(res.config.url));
        }
        if (res.config.responseType === "blob") {
            return res;
        }
        return res;
    }

    async handleErrorResponse(error: AxiosError): Promise<void> {

        if (!isCancelEvent(error) && error.config?.url) {
            _pendingRequests.delete(getUrlWithoutQueryParams(error.config.url));
        }

        if (isCancelEvent(error) || !error.response) {
            return Promise.reject(error);
        }
    }

    cancelPendingRequests(): void {
        this.cancelTokenSource?.cancel();
        this.cancelTokenSource = axios.CancelToken.source();
    }

    onUnhandledrejection(event) {
        if (isCancelEvent(event.reason)) {
            event.preventDefault();
        }
    }

    get<T>(requestInfo: RequestInfo): Promise<AxiosResponse<T>> {
        const { headers, parameters, url } = requestInfo;
        return this.axios.get<T>(
            `${url}${buildUrlQueryParams(parameters || {})}`,
            { headers });
    }

    async getFile(requestInfo: RequestInfo): Promise<GetFileResponse> {
        const { headers, parameters, url } = requestInfo;
        const response = await this.axios.get(
            `${url}${buildUrlQueryParams(parameters || {})}`,
            {
                ...headers,
                responseType: "blob",
            });

        return {
            fileName: this.getFileNameFromContentDispositionHeader(response.headers["content-disposition"] ?? "") ?? "untitled-file",
            fileData: new Blob([response.data], { type: response.headers["content-type"] }),
        };
    }

    post<TResponse = void>(requestInfo: RequestInfo): Promise<AxiosResponse<TResponse>> {
        const { headers, parameters, payload, url } = requestInfo;
        return this.axios.post<TResponse>(
            `${url}${buildUrlQueryParams(parameters || {})}`,
            payload,
            { headers });
    }

    put<TResponse = void>(requestInfo: RequestInfo): Promise<AxiosResponse<TResponse>> {
        const { headers, parameters, payload, url } = requestInfo;
        return this.axios.put<TResponse>(
            `${url}${buildUrlQueryParams(parameters || {})}`,
            payload,
            { headers });
    }

    delete<TResponse = void>(requestInfo: RequestInfo): Promise<AxiosResponse<TResponse>> {
        const { headers, parameters, url } = requestInfo;
        return this.axios.delete<TResponse>(
            `${url}${buildUrlQueryParams(parameters || {})}`,
            { headers });
    }

    private getFileNameFromContentDispositionHeader(header: string): string | null {
        if (header.startsWith("attachment")) {
            const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
            const matches = filenameRegex.exec(header);
            if (matches !== null && matches[1]) {
                return matches[1].replace(/['"]/g, "");
            }
        }
        return null;
    }
}

export default new HttpService();
