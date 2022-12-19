import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Violation } from './violation';
/**
 * @description Entidade "viajante do tempo"
 */
@Entity('time_traveller')
export class TimeTraveller {
    @PrimaryGeneratedColumn('uuid')
    id!: string
    @Column()
    name!: string
    @Column()
    birth!: string
    @Column()
    passport!: number
    @OneToMany(() => Violation, (violation) => violation.time_traveller, { nullable: true })
    violations?: Violation[]
}
