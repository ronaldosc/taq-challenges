import { DataSource } from "typeorm"
import { InfractionSeverity, TimeTraveller, Violation } from "./entities"

export const dataORM = new DataSource({
    type: 'postgres',
    entities: [TimeTraveller, Violation, InfractionSeverity],
    synchronize: true
})

export async function dbConfig() {
    dataORM.setOptions( {url: 'postgres://postgres:1234@192.168.2.101:5433/postgres' } )
    await dataORM.initialize()
}
