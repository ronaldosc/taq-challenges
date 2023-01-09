import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Violation } from './violation';
/**
 * @description Entidade "graus de infração"
 */
@Entity('infraction_severity')
export class InfractionSeverity {
    @PrimaryGeneratedColumn('rowid')
    id!: string
    @Column()
    text!: string
    @Column()
    grade!: number
    @OneToMany(() => Violation, violation => violation.severity, { nullable: true })
    violations?: Violation[]
}
