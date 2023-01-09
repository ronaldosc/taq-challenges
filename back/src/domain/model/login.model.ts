import { TimeTraveller } from "data/db/entities"

export interface LoginInputModel {
  passport: number
  password: string
}
export interface LoginResponseModel {
  token: string
  timeTraveller: TimeTraveller
  lastLoginAt?: string
}
