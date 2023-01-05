import * as jwt from "jsonwebtoken"
import { TimeTravellerModel } from "../../domain/model"
require("dotenv").config()

export const createToken = (payload: {
  timeTraveller: TimeTravellerModel
}): string => {
  const secret = process.env.SECRET!,
    expiresIn = "1h",
    token = jwt.sign(payload, secret, { expiresIn })

  return token
}

export const verifyToken = (token: string): TimeTravellerModel | undefined => {
  const secret = process.env.SECRET!,
    decodedToken = jwt.verify(token, secret)

  if (decodedToken) {
    return (decodedToken as any).timeTraveller
  }
  
  return
}
