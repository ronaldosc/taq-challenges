import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql"
import {
  getTravellerViolationsInfoUseCase,
  registryViolationUseCase
} from "../domain"
import { TravellerViolationModel, ViolationModel } from "../domain/model"
import { ServerContext } from "../domain/model/server-context.model"
import { GetTravellerViolationsInput, RegistryViolationInput } from "./input"
import { TravellerViolation, Violation } from "./type"

@Resolver()
export class ViolationsResolver {

  @Query(() => [TravellerViolation])
  @Authorized()
  getTravellerViolationsInfo(
    @Arg("data") data: GetTravellerViolationsInput
  ): Promise<TravellerViolationModel[]> {
    return getTravellerViolationsInfoUseCase(data)
  }
  
  @Mutation(() => Violation)
  @Authorized()
  registryViolation(
    @Ctx() context: ServerContext,
    @Arg("input") input: RegistryViolationInput
  ): Promise<ViolationModel> {
    console.log(context);
    return registryViolationUseCase(input)
  }
}
