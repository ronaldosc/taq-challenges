import { Field, InputType, Int } from "type-graphql"
import { VerifyTimeTravelPossibilityInputModel } from "../../domain/model"

@InputType()
export class VerifyTimeTravelPossibilityInput
  implements VerifyTimeTravelPossibilityInputModel
{
  @Field(() => Int, { description: "Time traveller passport" })
  passport!: number

  @Field({ description: "Request wish date to travel" })
  travelDate!: string
}
