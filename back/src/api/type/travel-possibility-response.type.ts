import { TravelPossibilityResponseModel } from "@domain/model"
import { Field, ObjectType } from "type-graphql"

@ObjectType()
export class TravelPossibilityResponse
  implements TravelPossibilityResponseModel
{
  @Field(() => Boolean)
  possibility!: boolean

  @Field({
    description: "Travel possibility message for the specified time period"
  })
  message!: string
}
