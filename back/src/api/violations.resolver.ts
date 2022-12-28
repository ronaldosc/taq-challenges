import { Arg, Mutation, Query, Resolver } from "type-graphql"
import {
    getTravellerViolationsInfoUseCase,
    registryViolationUseCase
} from "../domain"
import { ViolationModel } from "../domain/model"
import { GetTravellerViolationsInput, RegistryViolationInput } from "./input"
import { Violation } from "./type"

@Resolver()
export class ViolationsResolver {

  @Query(() => Violation)
  getTravellerViolationsInfo(
    @Arg("data") data: GetTravellerViolationsInput
  ): Promise<ViolationModel[]> {
    return getTravellerViolationsInfoUseCase(data)
  }
  
  @Mutation(() => Violation)
  registryViolation(
    @Arg("input") input: RegistryViolationInput
  ): Promise<ViolationModel> {
    return registryViolationUseCase(input)
  }
}
