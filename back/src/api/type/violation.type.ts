import { ViolationModel } from "@domain/model"
import { Field, ID, Int, ObjectType } from "type-graphql"

@ObjectType()
export class Violation implements ViolationModel {
  @Field(() => ID, { nullable: true, description: "Time traveller's violation identifier" })
  id!: string

  @Field(() => Int, { description: "Time traveller's passaport" })
  passport!: number

  @Field({ description: "Infraction's brief description" })
  description!: string

  @Field(() => Int, { description: "Infraction severity grade" })
  severity!: number

  @Field(() => Date)
  occurredAt!: string
}
