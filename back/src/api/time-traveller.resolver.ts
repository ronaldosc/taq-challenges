import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql"
import { Service } from "typedi"
import {
  CreateTimeTravellerUseCase,
  GetTravellerInfoUseCase,
  TimeTravellerModel,
  TravelPossibilityResponseModel,
  VerifyTravelPossibilityUseCase
} from "../domain"
import {
  CreateTimeTravellerInput,
  GetTravellerInfoInput,
  VerifyTimeTravelPossibilityInput
} from "./input"
import { TimeTraveller, TravelPossibilityResponse } from "./type"

@Service()
@Resolver()
export class TimeTravellerResolver {
  constructor(
    private readonly getTravellerInfoUseCase: GetTravellerInfoUseCase,
    private readonly createTimeTravellerUseCase: CreateTimeTravellerUseCase,
    private readonly verifyTravelPossibilityUseCase: VerifyTravelPossibilityUseCase
  ) { }

  @Query(() => TimeTraveller)
  @Authorized()
  getTravellerInfo(
    @Ctx()
    @Arg("data")
    data: GetTravellerInfoInput
  ): Promise<TimeTravellerModel> {
    return this.getTravellerInfoUseCase.exec(data)
  }
  @Mutation(() => TimeTraveller)
  createTimeTraveller(
    @Arg("input")
    input: CreateTimeTravellerInput
  ): Promise<TimeTravellerModel> {
    return this.createTimeTravellerUseCase.exec(input)
  }

  @Mutation(() => TravelPossibilityResponse)
  @Authorized()
  verifyTravelPossibility(
    @Ctx()
    @Arg("input")
    input: VerifyTimeTravelPossibilityInput
  ): Promise<TravelPossibilityResponseModel> {
    return this.verifyTravelPossibilityUseCase.exec(input)
  }
}
