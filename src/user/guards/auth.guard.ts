import { ExpressRequestInerface } from '../../types/expressRequest.interface';
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<ExpressRequestInerface>();
    if (req.user) {
      return true;
    }
    throw new HttpException('Not Autorized', HttpStatus.UNAUTHORIZED);
  }
}
