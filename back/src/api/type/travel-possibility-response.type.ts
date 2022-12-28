import { Field, Int, ObjectType } from "type-graphql"
import { VerifyTimeTravelPossibilityInputModel } from "../../domain/model"

@ObjectType()
export class TravelPossibilityResponse
  implements VerifyTimeTravelPossibilityInputModel
{
  @Field({ description: "Travel possibility along a time period" })
  message!: string

  @Field(() => Boolean)
  posssibility!: boolean

  

  @Field(() => Int, { description: "Time traveller's passaport" })
  passport!: number

  @Field({ description: "Request wish date to travel" })
  travelDate!: string
}
