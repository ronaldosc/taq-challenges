import {
  generatePasswordWithSalt,
  generateRandomSalt
} from "../../core/security"
import { TimeTravellerDataSource } from "../../data/source"
import { CreateTimeTravellerInputModel, TimeTravellerModel } from "../model"

export class CreateTimeTravellerUseCase {
  private readonly repository = new TimeTravellerDataSource()
  private readonly salt = generateRandomSalt()

  async exec(
    input: CreateTimeTravellerInputModel
  ): Promise<TimeTravellerModel> {
    const { birth, name, passport, password } = input
    const traveller = await this.repository.findOneByPassport(passport)
    const birthdate = new Date(birth)

    if (traveller) {
      throw new Error(
        `Usuário com o passaporte nº ${passport} já possui cadastro.`
      )
    }
  //FIX: não é mais possível registro de nascimento de data futura
    if (!birthdate.getTime() || Date.now() - birthdate.getTime() < 0) {
      throw new Error(`A data de nascimento ${birth} não é válida.`)
    }

    const hashedPassword = generatePasswordWithSalt(password, this.salt)

    return this.repository.loginUpdateOrUpdate({
      name,
      birth: birthdate.toJSON(),
      passport,
      password: hashedPassword,
      salt: this.salt
    })
  }
}
