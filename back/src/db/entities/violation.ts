import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { InfractionSeverity } from './infractionSeverity';
import { TimeTraveller } from './timeTraveller';

@Entity('violation')
export class Violation {
    @PrimaryGeneratedColumn('uuid')
    id!: string
    @Column()
    passport!: number
    @Column()
    description!: string
    @Column()
    occurred_at!: Date
    @ManyToOne(() => TimeTraveller)
    time_traveller!: TimeTraveller
    @ManyToOne(() => InfractionSeverity)
    severity!: InfractionSeverity
}