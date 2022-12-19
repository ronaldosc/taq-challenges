import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { InfractionSeverity } from './infractionSeverity';
import { TimeTraveller } from './timeTraveller';
/**
 * @description Entidade "violação/infração"
 */
@Entity('violation')
export class Violation {
    @PrimaryGeneratedColumn('uuid')
    id!: string
    @Column()
    description!: string
    @Column()
    occurred_at!: Date
    @ManyToOne(() => TimeTraveller)
    time_traveller!: TimeTraveller
    @ManyToOne(() => InfractionSeverity)
    severity!: InfractionSeverity
}