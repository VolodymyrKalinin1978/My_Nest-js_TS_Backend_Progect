import { ObjectId } from 'mongodb';
import { JWT_SECRET } from '../../../config';
import { ExpressRequestInerface } from '../../../types/expressRequest.interface';
import { UserService } from '../../user.service';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}
  async use(req: ExpressRequestInerface, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.user = null;
      next();
      return;
    }
    const token = req.headers.authorization.split(' ')[1];

    try {
      const decode = verify(token, JWT_SECRET) as { id: number } | null;

      let userId: ObjectId;

      // Перевірка типу і отримання id
      if (typeof decode !== 'string' && 'id' in decode) {
        userId = new ObjectId(decode.id);
      } else {
        throw new Error('Invalid token payload');
      }
      const user = await this.userService.findById(userId);

      req.user = user;

      next();
    } catch (error) {
      req.user = null;
      next();
    }
  }
}
