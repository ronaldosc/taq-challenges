import { Field, ObjectType } from "type-graphql"
import { TimeTraveller } from "../../data/db/entities"
import { LoginResponseModel } from "../../domain/model"
import { TimeTraveller as TimeTravellerType } from "./time-traveller.type"

@ObjectType()
export class LoginResponse implements LoginResponseModel {
  @Field({ description: "Session token with an expiration timeout"})
  token!: string

/////////////////////////////
  @Field(() => TimeTravellerType, { description: "Information about time traveller's entity"})
  timeTraveller!: TimeTraveller
////////////////////////////

  @Field(() => Date, { description: "Last it has logged in datetime"})
  lastLoginAt?: string
}
