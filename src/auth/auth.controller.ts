import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto';

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
}
