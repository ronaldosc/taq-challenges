import * as jwt from "jsonwebtoken"
import { TimeTravellerModel } from "../../domain/model"
require("dotenv").config()

export const createToken = (payload: {
  timeTraveller: TimeTravellerModel
}): string => {
  const secret = process.env.SECRET!
  const expiresIn = "1h"
  const token = jwt.sign(payload, secret, { expiresIn })

  return token
}

export const verifyToken = (token: string): TimeTravellerModel | undefined => {
  const secret = process.env.SECRET!
  const decodedToken = jwt.verify(token, secret)

  if (decodedToken) {
    return (decodedToken as any).timeTraveller
  }

  return
}
