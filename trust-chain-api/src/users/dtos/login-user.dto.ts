import { IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({ example: 'john@gmail.com' })
  @IsEmail()
  @IsString()
  readonly email: string;

  @ApiProperty({ example: 'strongpassword' })
  @IsString()
  readonly password: string;
}
