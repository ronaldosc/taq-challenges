import { TimeTravellerModel } from "@domain/model"
import { SECRET } from "@env"
import * as jwt from "jsonwebtoken"
import { Inject, Service } from "typedi"

@Service()
export class JwtService {
  constructor(@Inject(SECRET) private readonly secret: string) {}

  public createToken(payload: { timeTraveller: TimeTravellerModel }): string {
    const expiresIn = "1h"
    const token = jwt.sign(payload, this.secret, { expiresIn })
    return token
  }

  public verifyToken(token: string): TimeTravellerModel | undefined {
    // const secret = env.SECRET!
    const decodedToken = jwt.verify(token, this.secret)
    if (decodedToken) {
      return (decodedToken as any).timeTraveller
    }
    return
  }
}
