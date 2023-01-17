import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql"
import { Service } from "typedi"
import {
  GetTravellerViolationsInfoUseCase,
  RegistryViolationUseCase,
  TravellerViolationModel,
  ViolationModel
} from "../domain"
import { GetTravellerViolationsInput, RegistryViolationInput } from "./input"
import { TravellerViolation, Violation } from "./type"

@Service()
@Resolver()
export class ViolationsResolver {
  constructor(
    private readonly getTravellerViolationsInfoUseCase: GetTravellerViolationsInfoUseCase,
    private readonly registryViolationUseCase: RegistryViolationUseCase
  ) {}
  
  @Query(() => [TravellerViolation])
  @Authorized()
  getTravellerViolationsInfo(
    @Ctx()
    @Arg("data")
    data: GetTravellerViolationsInput
  ): Promise<TravellerViolationModel[]> {
    return this.getTravellerViolationsInfoUseCase.exec(data)
  }

  @Mutation(() => Violation)
  @Authorized()
  registryViolation(
    @Ctx()
    @Arg("input")
    input: RegistryViolationInput
  ): Promise<ViolationModel> {
    return this.registryViolationUseCase.exec(input)
  }
}
