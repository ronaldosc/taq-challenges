import { CryptoService } from "@crypto"
import { TimeTravellerDataSource } from "@data/source"
import {
  CreateTimeTravellerInputModel,
  TimeTravellerModel
} from "@domain/model"
import { Service } from "typedi"

@Service()
export class CreateTimeTravellerUseCase {
  private readonly salt = this.cryptoService.generateRandomSalt()
  constructor(
    private readonly repository: TimeTravellerDataSource,
    private readonly cryptoService: CryptoService
  ) { }

  public async exec(
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

    if (!birthdate.getTime() || Date.now() - birthdate.getTime() < 0) {
      throw new Error(`A data de nascimento '${birth}' não é válida.`)
    }

    const hashedPassword = this.cryptoService.generatePasswordWithSalt(
      password,
      this.salt
    )

    return this.repository.loginUpsert({
      name,
      birth: birthdate.toJSON(),
      passport,
      password: hashedPassword,
      salt: this.salt
    })
  }
}
