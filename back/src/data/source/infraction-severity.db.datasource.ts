import { dataORM } from "@data/db/dbconfig";
import { InfractionSeverity } from "@entities";
import { Repository } from "typeorm";
import { Service } from "typedi";

@Service()
export class SeverityDataSource {
  private readonly repository: Repository<InfractionSeverity> = dataORM.getRepository(InfractionSeverity);

  findOneById(id: string) {
    return this.repository.findOne({ where: { id } });
  }

  findOneByGrade(grade: number) {
    return this.repository.findOne({ where: { grade } });
  }
}
