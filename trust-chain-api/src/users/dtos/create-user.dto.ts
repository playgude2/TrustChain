import { IsString, IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'john@gmail.com' })
  @IsEmail()
  @IsString()
  readonly email: string;

  @ApiProperty({ example: 'strongpassword' })
  @IsString()
  @MinLength(6)
  readonly password: string;

  @ApiProperty({ example: 'John Doe' })
  @IsString()
  readonly name: string;
}
