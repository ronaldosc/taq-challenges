import { Arg, Mutation, Resolver } from "type-graphql"
import { LoginUseCase } from "../domain"
import { LoginResponseModel } from "../domain/model"
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
