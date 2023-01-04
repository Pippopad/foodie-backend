import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import knex, { Knex } from 'knex';

@Injectable()
export class DatabaseService {
  private _connection: Knex;

  constructor(private readonly configService: ConfigService) {}

  get connection(): Knex {
    return this._connection;
  }

  async onModuleInit() {
    this._connection = knex({
      client: 'pg',
      connection: {
        host: this.configService.get<string>('database.host'),
        port: this.configService.get<number>('database.port'),
        user: this.configService.get<string>('database.user'),
        password: this.configService.get<string>('database.password'),
        database: this.configService.get<string>('database.name'),
      },

      pool: { min: 0, max: 7 },
    });
  }

  async onModuleDestroy() {
    this._connection.destroy();
  }
}
