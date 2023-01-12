import { Arg, Mutation, Resolver } from "type-graphql";
import { LoginResponseModel, LoginUseCase } from "../domain";
import { LoginInput } from "./input";
import { LoginResponse } from "./type";
import { Service } from "typedi";

@Service()
@Resolver()
export class LoginResolver {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Mutation(() => LoginResponse)
  login(@Arg("input") input: LoginInput): Promise<LoginResponseModel> {
    return this.loginUseCase.exec(input);
  }
}
