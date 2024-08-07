import { InfractionSeverity, TimeTraveller, Violation } from "@entities"
import { DATABASE_URL } from "@env"
import Container from "typedi"
import { DataSource } from "typeorm"

export const dataORM = new DataSource({
  type: "postgres",
  entities: [TimeTraveller, Violation, InfractionSeverity],
  synchronize: true
})

export async function dbConfig() {
  dataORM.setOptions({ url: Container.get(DATABASE_URL) })
  await dataORM.initialize()
}
