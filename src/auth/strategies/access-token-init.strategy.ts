import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Payload } from '../entities';

@Injectable()
export class AccessTokenInitStrategy extends PassportStrategy(
  Strategy,
  'jwt-at-init',
) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('auth.jwt_secret'),
    });
  }

  async validate(payload: Payload): Promise<Payload> {
    return payload;
  }
}
