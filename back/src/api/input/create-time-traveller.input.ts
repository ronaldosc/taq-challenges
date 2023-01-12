import { Field, InputType, Int } from "type-graphql"
import { CreateTimeTravellerInputModel } from "@domain/model"

@InputType()
export class CreateTimeTravellerInput implements CreateTimeTravellerInputModel {
  @Field()
  name!: string

  @Field({ description: "Time traveller's birth" })
  birth!: string

  @Field(() => Int, { description: "Time traveller's passport" })
  passport!: number

  @Field()
  password!: string
}
