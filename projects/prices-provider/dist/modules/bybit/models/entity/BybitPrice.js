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
exports.BybitPrice = void 0;
const typeorm_1 = require("typeorm");
const BybitTickerSymbol_1 = require("./BybitTickerSymbol");
let BybitPrice = class BybitPrice {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], BybitPrice.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => BybitTickerSymbol_1.BybitTickerSymbol, (tickerSymbol) => tickerSymbol.symbol),
    (0, typeorm_1.JoinColumn)({ name: 'symbol' }),
    __metadata("design:type", String)
], BybitPrice.prototype, "symbol", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ type: 'bigint' }),
    __metadata("design:type", Number)
], BybitPrice.prototype, "startTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "numeric" }),
    __metadata("design:type", Number)
], BybitPrice.prototype, "open", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "numeric" }),
    __metadata("design:type", Number)
], BybitPrice.prototype, "close", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "numeric" }),
    __metadata("design:type", Number)
], BybitPrice.prototype, "low", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "numeric" }),
    __metadata("design:type", Number)
], BybitPrice.prototype, "high", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "numeric" }),
    __metadata("design:type", Number)
], BybitPrice.prototype, "volume", void 0);
BybitPrice = __decorate([
    (0, typeorm_1.Entity)()
], BybitPrice);
exports.BybitPrice = BybitPrice;
