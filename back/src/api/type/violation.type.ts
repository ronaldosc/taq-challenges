import { Field, ID, Int, ObjectType } from "type-graphql"
import { ViolationModel } from "../../domain/model"

@ObjectType()
export class Violation implements ViolationModel {
  @Field(() => ID, { nullable: true, description: "Time traveller's violation" })
  id!: string

  @Field(() => Int, { description: "Time traveller's passaport" })
  passport?: number

  @Field({ description: "Brief infraction's description" })
  description!: string

  @Field(() => Int, { description: "Infraction severity grade" })
  severity!: number
}
