import { dataORM } from "@data/db/dbconfig"
import { TimeTravellerModel } from "@domain/model"
import { TimeTraveller } from "@entities"
import { Repository } from "typeorm"

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

  loginUpset(timeTraveller: TimeTravellerModel & { password: string; salt: string })
  {
    if (timeTraveller.id)
    {
      return this.timeTravellerRepository.save(
        {
          ...timeTraveller,
          last_login_at: new Date()
        }
      )
    }
    return this.timeTravellerRepository.save({...timeTraveller})
  }
}
