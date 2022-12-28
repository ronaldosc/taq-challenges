import { Field, InputType, Int } from "type-graphql"
import { GetTravellerInfoInputModel } from "../../domain/model"

@InputType()
export class GetTravellerInfoInput implements GetTravellerInfoInputModel {
  @Field(() => Int, { description: "Time traveller's passport" })
  passport!: number
}
