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
    @Column({ select: false })
    password!: string
    @Column({ default: new Date() })
    last_login_at!: Date
    @Column({ unique: true })
    salt!: string
    @OneToMany(() => Violation, (violation) => violation.time_traveller, { nullable: true })
    violations?: Violation[]
}
