import {
  CreateTimeTravellerUseCase,
  GetTravellerInfoUseCase,
  VerifyTravelPossibilityUseCase,
  TimeTravellerModel,
  TravelPossibilityResponseModel
} from "../domain"
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql"
import {
  CreateTimeTravellerInput,
  GetTravellerInfoInput,
  VerifyTimeTravelPossibilityInput
} from "./input"
import { TimeTraveller, TravelPossibilityResponse } from "./type"

@Resolver()
export class TimeTravellerResolver {
  @Query(() => TimeTraveller)
  @Authorized()
  getTravellerInfo(
    @Ctx()
    @Arg("data")
    data: GetTravellerInfoInput
  ): Promise<TimeTravellerModel> {
    return new GetTravellerInfoUseCase().exec(data)
  }

  @Mutation(() => TimeTraveller)
  createTimeTraveller(
    @Arg("input") input: CreateTimeTravellerInput
  ): Promise<TimeTravellerModel> {
    return new CreateTimeTravellerUseCase().exec(input)
  }

  @Mutation(() => TravelPossibilityResponse)
  @Authorized()
  verifyTravelPossibility(
    @Ctx()
    @Arg("input")
    input: VerifyTimeTravelPossibilityInput
  ): Promise<TravelPossibilityResponseModel> {
    return new VerifyTravelPossibilityUseCase().exec(input)
  }
}
