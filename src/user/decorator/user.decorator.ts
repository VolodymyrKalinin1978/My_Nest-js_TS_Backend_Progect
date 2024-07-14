import { ExpressRequestInerface } from '../../types/expressRequest.interface';
import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const User = createParamDecorator(
  (data: any, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest<ExpressRequestInerface>();
    if (!req.user) {
      return null;
    }

    if (data) {
      return req.user[data];
    }
    return req.user;
  },
);
