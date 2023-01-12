import { Arg, Mutation, Resolver } from "type-graphql"
import { LoginResponseModel, LoginUseCase } from "../domain"
import { LoginInput } from "./input"
import { LoginResponse } from "./type"

@Resolver()
export class LoginResolver {
  @Mutation(() => LoginResponse)
  login(
    @Arg("input")
    input: LoginInput
  ): Promise<LoginResponseModel> {
    return new LoginUseCase().exec(input)
  }
}
