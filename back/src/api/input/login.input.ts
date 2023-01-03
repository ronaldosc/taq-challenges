import { Field, InputType, Int } from "type-graphql"
import { LoginInputModel } from "../../domain/model"

@InputType()
export class LoginInput implements LoginInputModel {
  @Field(() => Int, { description: "Time traveller passport" })
  passport!: number

  @Field(() => String, { description: "Password credential for registered time traveller" })
  password!: string
}
