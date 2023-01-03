import { Arg, Mutation, Query, Resolver } from "type-graphql"
import {
  getTravellerViolationsInfoUseCase,
  registryViolationUseCase
} from "../domain"
import { TravellerViolationModel, ViolationModel } from "../domain/model"
import { GetTravellerViolationsInput, RegistryViolationInput } from "./input"
import { TravellerViolation, Violation } from "./type"

@Resolver()
export class ViolationsResolver {

  @Query(() => [TravellerViolation])
  getTravellerViolationsInfo(
    @Arg("data") data: GetTravellerViolationsInput
  ): Promise<TravellerViolationModel[] | object | unknown> {
    return getTravellerViolationsInfoUseCase(data)
  }
  
  @Mutation(() => Violation)
  registryViolation(
    @Arg("input") input: RegistryViolationInput
  ): Promise<ViolationModel> {
    return registryViolationUseCase(input)
  }
}
