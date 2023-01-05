import { Field, Int, ObjectType } from "type-graphql"
import { SeverityModel } from "../../domain/model"

@ObjectType()
export class Severity implements SeverityModel {
  @Field(() => Int, {
    description: "Numbered grade took accordingly to infraction severity"
  })
  grade!: number

  @Field()
  text?: string
}
