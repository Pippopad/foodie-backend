import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from './dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async userLogin(loginDto: LoginDto) {
    const result = await this.validateUserCredentials(
      loginDto.username,
      loginDto.password,
    );
    return { result };
  }

  adminLogin(loginDto: LoginDto) {
    return { username: loginDto.username, password: loginDto.password };
  }

  async validateUserCredentials(
    username: string,
    password: string,
  ): Promise<boolean> {
    try {
      const { cid, pin, target } = this.configService.get('auth.classeviva');
      const uid = username ?? this.configService.get('auth.test_username');
      const pwd = password ?? this.configService.get('auth.test_password');
      const { data } = await firstValueFrom(
        this.httpService.post(
          this.configService.get<string>('auth.classeviva.login_endpoint'),
          `cid=${cid}&uid=${uid}&pwd=${pwd}&pin=${pin}&target=${target}`,
        ),
      );

      if (username && password) this.validateUserCredentials(null, null);

      console.log(data.data);
      return data.data.auth.loggedIn;
    } catch (error) {
      throw new InternalServerErrorException(
        'Cannot verify credentials! (error on contacting ClasseViva)',
      );
    }
  }
}
