import { SeverityModel } from "@domain/model"
import { Field, Int, ObjectType } from "type-graphql"

@ObjectType()
export class Severity implements SeverityModel {
  @Field(() => Int, {
    description: "Numbered grade took accordingly to infraction severity"
  })
  grade!: 3 | 5 | 7 | 12

  @Field()
  text?: string
}
