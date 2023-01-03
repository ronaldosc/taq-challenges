import { Repository } from "typeorm"
import { TimeTravellerModel } from "../../domain/model"
import { dataORM } from "../db/dbconfig"
import { TimeTraveller } from "../db/entities"

export class TimeTravellerDataSource {
  private readonly timeTravellerRepository: Repository<TimeTraveller> =
    dataORM.getRepository(TimeTraveller)

  findOneById(id: string) {
    return this.timeTravellerRepository.findOne({ where: { id } })
  }

  findOneByPassport(passport: number) {
    return this.timeTravellerRepository.findOne({
      where: { passport },
      select: {
        id: true,
        name: true,
        birth: true,
        passport: true,
        password: true,
        salt: true,
        last_login_at: true
      }
    })
  }

  save(timeTraveller: TimeTravellerModel & { password: string; salt: string }) {
    return this.timeTravellerRepository.save({
      ...timeTraveller,
      last_login_at: new Date()
    })
  }
}
