import { UserEntity } from '../user/user.entity';
import { Request } from 'express';
export interface ExpressRequestInerface extends Request {
  user?: UserEntity;
}
