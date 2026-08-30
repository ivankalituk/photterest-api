import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtUser } from './interfaces/jwt-user.interface';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: (request: Request): string | null =>
        request.cookies?.access_token ?? null,
      ignoreExpiration: false,
      secretOrKey: 'SUPER_SECRET_KEY',
    });
  }

  validate(payload: JwtPayload): JwtUser {
    return {
      id: payload.id,
      role: payload.role,
    };
  }
}
