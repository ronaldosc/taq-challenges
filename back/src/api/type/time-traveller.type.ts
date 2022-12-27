import { Field, ID, Int, ObjectType } from "type-graphql";
import { TimeTravellerModel } from '../../domain/model';

// type
@ObjectType()
export class TimeTraveller implements TimeTravellerModel {
  @Field(() => ID, { nullable: true, description: 'Time traveller ID' })
  id?: string;

  @Field(() => String)
  name!: string;

  @Field(() => Int)
  passport!: number;

  @Field(() => String)
  birth!: string;
}
