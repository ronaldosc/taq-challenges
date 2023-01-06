import { env } from "node:process"
import { DataSource } from "typeorm"
import { InfractionSeverity, TimeTraveller, Violation } from "./entities"
require("dotenv").config()

const db_URI = `${env.DB_CONNECTION}://${env.DB_USERNAME}:${env.DB_PASS}@${env.DB_HOST}:${env.DB_PORT}/${env.DB_DATABASE}`

export const dataORM = new DataSource({
  type: "postgres",
  entities: [TimeTraveller, Violation, InfractionSeverity],
  synchronize: true
})

export async function dbConfig() {
  dataORM.setOptions({ url: db_URI })
  await dataORM.initialize()
}
