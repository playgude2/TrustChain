import { IsString, IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrganizationDto {
  @ApiProperty({
    example: 'Tech Innovators',
    description: 'The name of the organization',
  })
  @IsString()
  readonly name: string;

  @ApiProperty({
    example: 'strongpassword',
    description: 'The password for the organization',
  })
  @IsString()
  @MinLength(6)
  readonly password: string;

  @ApiProperty({
    example: 'contact@techinnovators.com',
    description: 'The contact email of the organization',
  })
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    example: 'Technology',
    description: 'The sector of the organization',
  })
  @IsString()
  readonly sector: string;

  @ApiProperty({
    example: '+1234567890',
    description: 'The contact number of the organization',
  })
  @IsString()
  readonly contact: string;

  @ApiProperty({
    example: 'United States',
    description: 'The country where the organization is based',
  })
  @IsString()
  readonly country: string;

  @ApiProperty({
    example: 'private-key-string',
    description: 'The private key for the organization wallet',
  })
  @IsString()
  readonly walletPrivateKey: string;

  @ApiProperty({
    example: 'public-key-string',
    description: 'The public key for the organization wallet',
  })
  @IsString()
  readonly walletPublicKey: string;
}
