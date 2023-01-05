import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql"
import {
  GetTravellerViolationsInfoUseCase,
  RegistryViolationUseCase
} from "../domain"
import {
  ServerContext,
  TravellerViolationModel,
  ViolationModel
} from "../domain/model"
import { GetTravellerViolationsInput, RegistryViolationInput } from "./input"
import { TravellerViolation, Violation } from "./type"

@Resolver()
export class ViolationsResolver {
  @Query(() => [TravellerViolation])
  @Authorized()
  getTravellerViolationsInfo(
    @Ctx() _context: ServerContext,
    @Arg("data") data: GetTravellerViolationsInput
  ): Promise<TravellerViolationModel[]> {
    return new GetTravellerViolationsInfoUseCase().exec(data)
  }

  @Mutation(() => Violation)
  @Authorized()
  registryViolation(
    @Ctx() _context: ServerContext,
    @Arg("input") input: RegistryViolationInput
  ): Promise<ViolationModel> {
    return new RegistryViolationUseCase().exec(input)
  }
}
