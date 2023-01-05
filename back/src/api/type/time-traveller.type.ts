import { Field, ID, Int, ObjectType } from "type-graphql"
import { TimeTravellerModel } from "../../domain/model"

@ObjectType()
export class TimeTraveller implements TimeTravellerModel {
  
  @Field(() => ID, { nullable: true, description: "Time traveller ID" })
  id?: string

  @Field(() => String)
  name!: string

  @Field(() => Date)
  birth!: string
  
  @Field(() => Int)
  passport!: number
}
