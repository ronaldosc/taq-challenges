import { CryptoService } from "@crypto"
import { TimeTravellerDataSource } from "@data/source"
import { LoginInputModel, LoginResponseModel } from "@domain/model"
import { JwtService } from "@jwt"
import { Service } from "typedi"

@Service()
export class LoginUseCase {
  constructor(
    private readonly repository: TimeTravellerDataSource,
    private readonly jwtService: JwtService,
    private readonly cryptoService: CryptoService
  ) {}

  async exec(input: LoginInputModel): Promise<LoginResponseModel> {
    const { passport: passpt, password } = input
    const timeTraveller = await this.repository.findOneByPassport(passpt)
    const salt = timeTraveller?.salt
    const hashedPassword = this.cryptoService.generatePasswordWithSalt(
      password,
      salt ?? "defaultSalt"
    )

    if (!timeTraveller || timeTraveller?.password !== hashedPassword) {
      throw new Error(`Credenciais de usuário inválidas.`)
    }

    const { id, name, passport, birth, last_login_at } = timeTraveller
    const localeDateTime = new Intl.DateTimeFormat("pt-BR", {
      dateStyle: "medium",
      timeStyle: "long",
      timeZone: new Intl.DateTimeFormat().resolvedOptions().timeZone
    })

    const lastLoggedIn: string = last_login_at
      ? localeDateTime.format(last_login_at)
      : "Este é o primeiro acesso."

    const token = this.jwtService.createToken({
      timeTraveller: { id, name, passport, birth }
    })

    await this.repository.loginUpsert(timeTraveller)

    return {
      token,
      timeTraveller,
      lastLoginAt: lastLoggedIn
    }
  }
}
