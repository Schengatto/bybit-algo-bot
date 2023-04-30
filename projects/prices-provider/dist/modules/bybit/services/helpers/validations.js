"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResult = void 0;
const getResult = (data) => {
    if (data.retMsg !== "OK") {
        const { retMsg, retCode, retExtInfo } = data;
        throw Error(`ByBit error: ${retMsg}. StatusCode: ${retCode} | ${JSON.stringify(retExtInfo)}`);
    }
    return data.result;
};
exports.getResult = getResult;
