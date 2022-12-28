import { Field, ObjectType } from "type-graphql"
import { TimeTraveller } from "../../data/db/entities"
import { LoginResponseModel } from "../../domain/model"

@ObjectType()
export class LoginResponse implements LoginResponseModel {
  @Field({ description: "Session token with an expiration timeout"})
  token!: string

  @Field(() => ObjectType)
  timeTraveller!: TimeTraveller

  @Field({ description: "Last it has logged in datetime"})
  lastLoginAt?: string
}
