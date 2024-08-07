import { dataORM } from "@data/db/dbconfig"
import { InfractionSeverity } from "@entities"
import { Service } from "typedi"
import { Repository } from "typeorm"

@Service()
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
