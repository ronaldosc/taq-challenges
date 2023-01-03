/* import { JwtService } from '@core/security/jwt';
import { UserTokenData } from '@domain/model';
import { Request, Response } from 'express';
import { Container } from 'typedi';
import { v4 as generateUUID } from 'uuid';

export const ContextToken = Symbol();
export interface ServerContext {
  [ContextToken]: true;
  uuid: string;
  sessionId?: string;
  loggableUserId?: string;
  userId?: string;
  // Add your context variables here
}

export interface ContextParameters {
  req: Request;
  res: Response;
}

export const context = async ({ req }: ContextParameters): Promise<ServerContext> => {
  const jwtService = Container.get(JwtService);

  const token = req.headers.authorization;
  const decodedToken = token && jwtService.verify<UserTokenData>(token);

  const uuid = generateUUID();
  const sessionId = req.headers['x-session-uuid'] as string;

  const context: ServerContext = {
    [ContextToken]: true,
    uuid,
    sessionId,
  };

  if (decodedToken) {
    context.userId = decodedToken.data.userId;
    context.loggableUserId = decodedToken.data.userId;
  }

  return context;
};

export function isServerContext(arg: any): arg is ServerContext {
  return arg?.[ContextToken] ?? false;
} */