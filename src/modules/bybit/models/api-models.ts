export interface ResponseWrapper<T> {
    retCode: number;
    retMsg: string;
    time: number;
    retExtInfo: any;
    result: T;
}
