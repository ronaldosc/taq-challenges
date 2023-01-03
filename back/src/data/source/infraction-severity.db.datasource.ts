import { Repository } from "typeorm"
import { dataORM } from "../db/dbconfig"
import { InfractionSeverity } from "../db/entities"

export class SeverityDataSource {
  private readonly repository: Repository<InfractionSeverity> =
    dataORM.getRepository(InfractionSeverity)

  findOneById(id: string) {
    return this.repository.findOne({ where: { id } })
  }

  findOneByGrade(grade: number) {
    return this.repository.findOne({ where: { grade } })
  }
}
