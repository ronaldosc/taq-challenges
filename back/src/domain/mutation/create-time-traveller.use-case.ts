import {
  generatePasswordWithSalt,
  generateRandomSalt
} from "../../core/security";
import { TimeTravellerDataSource } from "../../data/source";
import { CreateTimeTravellerInputModel, TimeTravellerModel } from "../model";

export class CreateTimeTravellerUseCase {
  readonly repository = new TimeTravellerDataSource()
  private readonly salt = generateRandomSalt()

  async exec(input: CreateTimeTravellerInputModel): Promise<TimeTravellerModel>  {
    const { birth, name, passport, password } = input,
      traveller = await this.repository.findOneByPassport(passport)

    if (traveller) {
      throw new Error(`Usuário com o passaporte nº ${passport} já possui cadastro.`)
    }

    if (!new Date(birth)?.getTime()) {
      throw new Error(`A data de nascimento ${birth} não é válida.`)
    }

    const hashedPassword = generatePasswordWithSalt(password, this.salt)

    return this.repository.save({
      name,
      birth: new Date(birth).toJSON(),
      passport,
      password: hashedPassword,
      salt: this.salt
    })
  }
}