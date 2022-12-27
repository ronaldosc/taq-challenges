import { Arg, Query, Resolver } from 'type-graphql';
import { getTravellerInfoUseCase } from '../domain';
import { TimeTravellerModel } from '../domain/model';
import { GetTravellerInfoInput } from './input';
import { TimeTraveller } from './type';

@Resolver()
export default class TimeTravellerResolver {
  @Query(() => TimeTraveller)
  getTravellerInfo(@Arg('data') data: GetTravellerInfoInput): Promise<TimeTravellerModel> {
    return getTravellerInfoUseCase(data);
  }
}
