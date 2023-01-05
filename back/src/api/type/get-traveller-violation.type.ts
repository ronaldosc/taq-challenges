import { Field, ID, Int, ObjectType } from "type-graphql"
import { TravellerViolationModel } from "../../domain/model"

@ObjectType()
export class TravellerViolation implements TravellerViolationModel {
  @Field(() => ID, { nullable: true, description: "Time traveller's violation identifier" })
  id!: string

  @Field({ description: "Infraction's brief description" })
  description!: string

  @Field(() => Int, { description: "Infraction severity grade" })
  severity!: number

  @Field(() => Date)
  occurredAt!: string
}
