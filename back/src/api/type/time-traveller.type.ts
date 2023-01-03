import { Min } from "class-validator"
import { Field, ID, Int, ObjectType } from "type-graphql"
import { TimeTravellerModel } from "../../domain/model"

@ObjectType()
export class TimeTraveller implements TimeTravellerModel {
  
  @Field(() => ID, { nullable: true, description: "Time traveller ID" })
  id?: string

  @Field(() => String)
  name!: string

  @Field(() => String)
  birth!: string
  
  @Field(() => Int)
  @Min(1)
  passport!: number
}
