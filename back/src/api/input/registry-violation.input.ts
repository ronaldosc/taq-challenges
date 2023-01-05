import { Field, InputType, Int } from "type-graphql"
import { RegistryViolationInputModel } from "../../domain/model"

@InputType()
export class RegistryViolationInput implements RegistryViolationInputModel {
  @Field(() => Int, { description: "Time traveller's passport" })
  passport!: number

  @Field()
  description!: string

  @Field()
  occurredAt!: string

  @Field(() => Int)
  severity!: number
}
