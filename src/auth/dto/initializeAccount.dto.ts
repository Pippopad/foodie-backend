import { IsNotEmpty, IsString, Length } from 'class-validator';

export class InitializeAccountDto {
  @IsString()
  @Length(3, 5)
  @IsNotEmpty()
  grade: string;
}
