import { GetTravellerViolationsInputModel } from "@domain/model"
import { Field, InputType, Int } from "type-graphql"

@InputType()
export class GetTravellerViolationsInput
  implements GetTravellerViolationsInputModel
{
  @Field(() => Int, { description: "Time traveller's passport" })
  passport!: number
}
