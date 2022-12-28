import { Field, InputType, Int } from "type-graphql"
import { GetTravellerViolationsInputModel } from "../../domain/model"

@InputType()
export class GetTravellerViolationsInput
  implements GetTravellerViolationsInputModel
{
  @Field(() => Int, { description: "Time traveller's passport" })
  passport!: number
}
