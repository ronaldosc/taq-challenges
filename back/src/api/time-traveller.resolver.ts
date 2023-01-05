import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql"
import {
  createTimeTravellerUseCase,
  getTravellerInfoUseCase,
  verifyTravelPossibilityUseCase
} from "../domain"
import {
  TimeTravellerModel,
  TravelPossibilityResponseModel
} from "../domain/model"
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
    @Arg("data") data: GetTravellerInfoInput
  ): Promise<TimeTravellerModel> {
    return getTravellerInfoUseCase(data)
  }

  @Mutation(() => TimeTraveller)
  createTimeTraveller(
    @Arg("input") input: CreateTimeTravellerInput
  ): Promise<TimeTravellerModel> {
    return createTimeTravellerUseCase(input)
  }

  @Mutation(() => TravelPossibilityResponse)
  @Authorized()
  verifyTravelPossibility(
    @Arg("input") input: VerifyTimeTravelPossibilityInput
  ): Promise<TravelPossibilityResponseModel> {
    return verifyTravelPossibilityUseCase(input)
  }
}
