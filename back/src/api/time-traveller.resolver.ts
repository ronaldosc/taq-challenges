import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql"
import {
  CreateTimeTravellerUseCase,
  GetTravellerInfoUseCase,
  VerifyTravelPossibilityUseCase
} from "../domain"
import {
  ServerContext, TimeTravellerModel,
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
    @Ctx() _context: ServerContext,
    @Arg("data") data: GetTravellerInfoInput
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
    @Ctx() _context: ServerContext,
    @Arg("input") input: VerifyTimeTravelPossibilityInput
  ): Promise<TravelPossibilityResponseModel> {
    return new VerifyTravelPossibilityUseCase().exec(input)
  }
}
