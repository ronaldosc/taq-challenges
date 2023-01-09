import {
  GetTravellerViolationsInfoUseCase,
  RegistryViolationUseCase,
  TravellerViolationModel,
  ViolationModel
} from "../domain"
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql"
import { GetTravellerViolationsInput, RegistryViolationInput } from "./input"
import { TravellerViolation, Violation } from "./type"

@Resolver()
export class ViolationsResolver {
  @Query(() => [TravellerViolation])
  @Authorized()
  getTravellerViolationsInfo(
    @Ctx()
    @Arg("data")
    data: GetTravellerViolationsInput
  ): Promise<TravellerViolationModel[]> {
    return new GetTravellerViolationsInfoUseCase().exec(data)
  }

  @Mutation(() => Violation)
  @Authorized()
  registryViolation(
    @Ctx()
    @Arg("input")
    input: RegistryViolationInput
  ): Promise<ViolationModel> {
    return new RegistryViolationUseCase().exec(input)
  }
}
