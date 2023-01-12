import { TimeTravellerDataSource } from "@data/source"
import { LoginInputModel, LoginResponseModel } from "@domain/model"
import { createToken, generatePasswordWithSalt } from "@security"

@Service()
export class LoginUseCase {
  constructor(
    private readonly jwtService: JwtService, 
    private readonly repository: TimeTravellerDataSource,
  ) {}

  async exec(input: LoginInputModel): Promise<LoginResponseModel> {
    const { passport: passpt, password } = input
    const timeTraveller = await this.repository.findOneByPassport(passpt)
    const salt = timeTraveller?.salt
    const hashedPassword = generatePasswordWithSalt(
      password,
      salt ?? "defaultSalt"
    )

    if (timeTraveller?.password !== hashedPassword || !timeTraveller) {
      throw new Error(`Credenciais de usuário inválidas.`)
    }

    const { id, name, passport, birth, last_login_at } = timeTraveller
    const localeDateTime = new Intl.DateTimeFormat("pt-BR", {
      dateStyle: "medium",
      timeStyle: "long",
      timeZone: new Intl.DateTimeFormat().resolvedOptions().timeZone
    })
    // let lastLoggedIn: string

    // last_login_at
    //   ? (lastLoggedIn = localeDateTime.format(last_login_at))
    //   : (lastLoggedIn = "Este é o primeiro acesso.")

    const lastLoginAt = last_login_at
      ? localeDateTime.format(last_login_at)
      : "Este é o primeiro acesso."

    const token = this.jwtService.createToken({ timeTraveller: { id, name, passport, birth } })

    await this.repository.loginUpset(timeTraveller)

    return {
      token,
      timeTraveller,
      lastLoginAt,
    }
  }
}
