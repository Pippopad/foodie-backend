import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AccessTokenInitGuard extends AuthGuard('jwt-at-init') {
  constructor() {
    super();
  }
}
