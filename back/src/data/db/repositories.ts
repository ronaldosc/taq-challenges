import { Repository } from "typeorm"
import { dataORM } from "./dbconfig"
import { InfractionSeverity, TimeTraveller, Violation } from "./entities"

/* interface Repositories<> extends Repository<T>{
     object: object<T>
} */

export abstract class Repos {
  public timeTravellerRepository: Repository<object>
  protected violationRepository: Repository<object>
  protected severityRepository: Repository<object>

  public timeTraveller() {
    this.timeTravellerRepository = dataORM.getRepository(TimeTraveller)
  }
  violation() {
    this.violationRepository = dataORM.getRepository(Violation)
  }
  severity() {
    this.severityRepository = dataORM.getRepository(InfractionSeverity)
  }

  public constructor(
    severityRepository?: any,
    timeTravellerRepository?: any,
    violationRepository?: any
  ) {
    this.severityRepository = severityRepository
    this.timeTravellerRepository = timeTravellerRepository
    this.violationRepository = violationRepository
  }
}
