import { InfractionSeverity, TimeTraveller, Violation } from "@entities"
import { DATABASE_URL, EnvConfig } from "@env"
import Container from "typedi"
import { DataSource } from "typeorm"

EnvConfig.config()
const databaseURL = Container.get(DATABASE_URL)

export const dataORM = new DataSource({
  type: "postgres",
  entities: [TimeTraveller, Violation, InfractionSeverity],
  synchronize: true
})

export async function dbConfig() {
  dataORM.setOptions({ url: databaseURL })
  await dataORM.initialize()
}
