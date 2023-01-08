import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InitializeAccountDto, LoginDto } from './dto';
import { firstValueFrom } from 'rxjs';
import { DatabaseService } from 'src/database/database.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    private readonly databaseService: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}

  async userLogin(loginDto: LoginDto) {
    let { username } = loginDto;
    const result = await this.validateUserCredentials(
      username,
      loginDto.password,
    );

    if (!result)
      throw new UnauthorizedException({ message: 'invalid credentials' });

    // If included, removes domain frome the username
    if (username.includes('@')) username = username.split('@')[0];

    username = username.toLowerCase();

    const [user] = await this.databaseService
      .connection('users')
      .select('*')
      .where({ username });

    const token = this.jwtService.sign(
      { username },
      {
        secret: this.configService.get<string>('auth.jwt_secret'),
        expiresIn: 60 * 60,
      },
    );

    if (!user) {
      return { token, message: 'need to initializate' };
    }

    return { token, message: '' };
  }

  adminLogin(loginDto: LoginDto) {
    return { username: loginDto.username, password: loginDto.password };
  }

  async initializeAccount(
    username: string,
    initializeAccountDto: InitializeAccountDto,
  ) {
    let { grade } = initializeAccountDto;
    grade = grade
      .trim()
      .replace(/ +(?= )/g, '')
      .replace(' ', '')
      .toUpperCase();

    try {
      const [user] = await this.databaseService
        .connection('users')
        .insert({
          username,
          grade,
        })
        .returning('*');

      return user;
    } catch (e) {
      throw new BadRequestException({ message: 'user already initialized' });
    }
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
