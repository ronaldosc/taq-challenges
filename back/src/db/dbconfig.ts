import { DataSource } from "typeorm"
import { InfractionSeverity, TimeTraveller, Violation } from "./entities"
require("dotenv").config() // tem que ter o ()
// o import ele retorna tipado como funçaõ, pode ser melhor que o require, teria que declarar num arquivo d.ts da tipagem de retorno
const db_URI = `postgres://postgres:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB}`

export const dataORM = new DataSource({
  type: "postgres",
  entities: [TimeTraveller, Violation, InfractionSeverity],
  synchronize: true
})

export async function dbConfig() {
  dataORM.setOptions({ url: db_URI }),
  await dataORM.initialize()
}
