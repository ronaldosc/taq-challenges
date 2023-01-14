import {
  DB_DATABASE,
  DB_HOST,
  DB_PASS,
  DB_PORT,
  DB_SCHEME,
  DB_USER,
  EnvConfig
} from "@env"
import Container from "typedi"
import { DataSource } from "typeorm"
import { InfractionSeverity, TimeTraveller, Violation } from "./entities"

EnvConfig.config()
const dbScheme = Container.get(DB_SCHEME)
const dbUser = Container.get(DB_USER)
const dbPass = Container.get(DB_PASS)
const dbHost = Container.get(DB_HOST)
const dbPort = Container.get(DB_PORT)
const dbDatabase = Container.get(DB_DATABASE)

const dbURI = `${dbScheme}://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbDatabase}`

export const dataORM = new DataSource({
  type: "postgres",
  entities: [TimeTraveller, Violation, InfractionSeverity],
  synchronize: true
})

export async function dbConfig() {
  dataORM.setOptions({ url: dbURI })
  await dataORM.initialize()
}
