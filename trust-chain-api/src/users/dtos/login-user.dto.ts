import { IsString, IsEmail, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(6)
  readonly password: string;
}
