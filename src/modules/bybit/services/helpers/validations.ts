import { ResponseWrapper } from "../../models/api-models";

export const getResult = (data: ResponseWrapper<any>) => {
    if (data.retMsg !== "OK") {
        const { retMsg, retCode, retExtInfo } = data;
        throw Error(`ByBit error: ${retMsg}. StatusCode: ${retCode} | ${retExtInfo}`);
    }
    return data.result;
};