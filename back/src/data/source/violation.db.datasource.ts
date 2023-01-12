import { dataORM } from "@data/db/dbconfig";
import { Violation } from "@entities";
import { Repository } from "typeorm";
import { Service } from "typedi";

@Service()
export class ViolationDataSource {
  private readonly violationRepository: Repository<Violation> = dataORM.getRepository(Violation);

  findOneById(id: string) {
    return this.violationRepository.findOne({ where: { id } });
  }

  save(violation: Omit<Violation, "id"> & { id?: string }) {
    return this.violationRepository.save(violation);
  }

  findByTravellerId(id: string) {
    return this.violationRepository.find({
      where: { time_traveller: { id } },
      relations: ["severity"],
    });
  }

  findByDateRange(startDate: number | Date, endDate: number | Date) {
    return this.violationRepository
      .createQueryBuilder("violation")
      .where("violation.occurred_at >= :startDate", { startDate })
      .andWhere("violation.occurred_at <= :endDate", { endDate })
      .getOne();
  }
}
