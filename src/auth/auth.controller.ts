import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { User } from 'src/utils/get-user.decorator';
import { AuthService } from './auth.service';
import { InitializeAccountDto, LoginDto } from './dto';
import { AccessTokenInitGuard } from './guards';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('user')
  @HttpCode(HttpStatus.OK)
  userLogin(@Body() loginDto: LoginDto) {
    return this.authService.userLogin(loginDto);
  }

  @Post('admin')
  @HttpCode(HttpStatus.OK)
  adminLogin(@Body() loginDto: LoginDto) {
    return this.authService.adminLogin(loginDto);
  }

  @Post('initialize')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AccessTokenInitGuard)
  initializeAccount(
    @User('username') username,
    @Body() initializeAccountDto: InitializeAccountDto,
  ) {
    return this.authService.initializeAccount(username, initializeAccountDto);
  }
}
