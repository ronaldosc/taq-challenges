import { GetTravellerInfoInputModel } from "@domain/model"
import { Field, InputType, Int } from "type-graphql"

@InputType()
export class GetTravellerInfoInput implements GetTravellerInfoInputModel {
  @Field(() => Int, {
    description: "Time traveller's passport",
    nullable: false
  })
  passport!: number
}
