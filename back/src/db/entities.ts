import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
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

@Entity('infraction_severity')
export class InfractionSeverity {
    @PrimaryGeneratedColumn('uuid')
    id!: string
    @Column()
    text!: string
    @Column()
    grade!: number
    @OneToMany(() => Violation, (violation) => violation.severity, { nullable: true } )
    violations?: Violation[]
}

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
