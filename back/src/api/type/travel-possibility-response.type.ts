import { Field, ObjectType } from "type-graphql"
import { TravelPossibilityResponseModel } from "../../domain/model"

@ObjectType()
export class TravelPossibilityResponse
  implements TravelPossibilityResponseModel
{
  @Field({ description: "Travel possibility along a time period" })
  message!: string

  @Field(() => Boolean)
  possibility!: boolean
}
