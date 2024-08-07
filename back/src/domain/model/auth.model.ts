import { TimeTraveller } from "@entities"

export interface LoginInputModel {
  passport: number
  password: string
}
export interface LoginResponseModel {
  token: string
  timeTraveller: TimeTraveller
  lastLoginAt?: string
}
export interface ServerContext {
  token: string;
}
