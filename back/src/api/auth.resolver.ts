import { Arg, Mutation, Resolver } from "type-graphql"
import { loginUseCase } from "../domain"
import { LoginInput } from "./input"
import { LoginResponse, TravelPossibilityResponse } from "./type"

//   estão certos o model, type e input ?
@Resolver()
export class LoginResolver {
  @Mutation(() => TravelPossibilityResponse)
  getTravellerInfo(@Arg("input") input: LoginInput): Promise<LoginResponse> {
    return loginUseCase(input)
  }
  
}
