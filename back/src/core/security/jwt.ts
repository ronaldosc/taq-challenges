import { TimeTravellerModel } from "@domain/model"
import { SECRET, TOKEN_EXPIRATION } from "@env"
import jwt from "jsonwebtoken"
import { Inject, Service } from "typedi"

@Service()
export class JwtService {
  constructor(
    @Inject(SECRET) private readonly secret: string,
    @Inject(TOKEN_EXPIRATION) private readonly expiration: string
  ) {}

  public createToken(payload: { timeTraveller: TimeTravellerModel }): string {
    const token = jwt.sign(payload, this.secret, { expiresIn: this.expiration })
    return token
  }

  public verifyToken(token: string): TimeTravellerModel | undefined {
    const decodedToken = jwt.verify(token, this.secret)
    if (decodedToken) {
      return (decodedToken as any).timeTraveller
    }
    return
  }
}
