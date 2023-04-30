"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BybitTickerSymbol = void 0;
const typeorm_1 = require("typeorm");
const BybitPrice_1 = require("./BybitPrice");
let BybitTickerSymbol = class BybitTickerSymbol {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], BybitTickerSymbol.prototype, "symbol", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], BybitTickerSymbol.prototype, "isEnabled", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((type) => BybitPrice_1.BybitPrice, (price) => price.symbol),
    __metadata("design:type", Array)
], BybitTickerSymbol.prototype, "prices", void 0);
BybitTickerSymbol = __decorate([
    (0, typeorm_1.Entity)()
], BybitTickerSymbol);
exports.BybitTickerSymbol = BybitTickerSymbol;
