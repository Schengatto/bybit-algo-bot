import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BybitTickerSymbol } from "./BybitTickerSymbol";

@Entity()
export class BybitPrice {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => BybitTickerSymbol, (tickerSymbol) => tickerSymbol.symbol)
    @JoinColumn({ name: 'symbol' })
    symbol: string;

    @Index()
    @Column({ type: 'bigint' })
    startTime: number;

    @Column({ type: "numeric" })
    open: number;

    @Column({ type: "numeric" })
    close: number;

    @Column({ type: "numeric" })
    low: number;

    @Column({ type: "numeric" })
    high: number;

    @Column({ type: "numeric" })
    volume: number;
}