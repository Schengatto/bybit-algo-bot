import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { BybitPrice } from "./BybitPrice";

@Entity()
export class BybitTickerSymbol {
    @PrimaryColumn()
    symbol: string;

    @Column()
    isEnabled: boolean;

    @OneToMany((type) => BybitPrice, (price) => price.symbol)
    prices: BybitPrice[];
}