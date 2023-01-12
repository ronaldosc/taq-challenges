import * as jwt from "jsonwebtoken"
import { TimeTravellerModel } from "@domain/model"
import { Inject } from 'typedi';
import { SECRET } from '@code/env/env.config';


@Service()
export class JwtService {
  constructor(@Inject(SECRET) private readonly secret: string) {}

  createToken(payload: {
    timeTraveller: TimeTravellerModel
  }): string {
    const expiresIn = "1h"
    const token = jwt.sign(payload, this.secret, { expiresIn })
  
    return token
  }
  
  verifyToken(token: string): TimeTravellerModel | undefined {
    const decodedToken = jwt.verify(token, this.secret)
  
    if (decodedToken) {
      return (decodedToken as any).timeTraveller
    }
  
    return
  }
  
}