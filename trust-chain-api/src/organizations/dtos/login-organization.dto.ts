import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginOrganizationDto {
  @ApiProperty({
    example: 'contact@techinnovators.com',
    description: 'The contact email of the organization',
  })
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    example: 'strongpassword',
    description: 'The password for the organization',
  })
  @IsString()
  readonly password: string;
}
