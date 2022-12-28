import { Field, Int, ObjectType } from "type-graphql"
import { LoginInputModel } from "../../domain/model"

@ObjectType()
export class LoginInput implements LoginInputModel {
  @Field(() => Int, { description: "Time traveller passport" })
  passport!: number

  @Field({ description: "Password credential for registered time traveller" })
  password!: string
}
