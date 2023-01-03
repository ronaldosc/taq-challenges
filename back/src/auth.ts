// Define as regras de autorização
function isAuthorized(user: any): boolean {
  if (user.isAuthenticated && user.hasPermission("admin")) {
    return true
  }


  
  return false
}







/* ## authorization.Middleware
import { UnauthorizedError } from '@core/error';
import { AuthChecker } from 'type-graphql';
import { ServerContext } from './server.context';

export const AuthorizationMiddleware: AuthChecker<ServerContext> = async ({ context }) => {
  const userId = context?.userId;

  if (!userId) {
    throw new UnauthorizedError();
  }

  return true;
};
 */