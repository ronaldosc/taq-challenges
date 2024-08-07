import { LoginResolver } from "./auth.resolver"
import { TimeTravellerResolver } from "./time-traveller.resolver"
import { ViolationsResolver } from "./violations.resolver"

export const resolvers = [
  LoginResolver,
  TimeTravellerResolver,
  ViolationsResolver
] as const
