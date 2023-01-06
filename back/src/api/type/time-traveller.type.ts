import { Field, ID, Int, ObjectType } from "type-graphql"
import { TimeTravellerModel } from "../../domain/model"

@ObjectType()
export class TimeTraveller implements TimeTravellerModel {
  
  @Field(() => ID, { nullable: true, description: "Time traveller ID" })
  id?: string

  @Field()
  name!: string

  @Field()
  birth!: string
  
  @Field(() => Int)
  passport!: number
}
