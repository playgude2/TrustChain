import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Organizations {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'Tech Innovators',
    description: 'The name of the organization',
  })
  @Column()
  name: string;

  @ApiProperty({
    example: 'strongpassword',
    description: 'The password for the organization',
  })
  @Column()
  password: string;

  @ApiProperty({
    example: 'contact@techinnovators.com',
    description: 'The contact email of the organization',
  })
  @Column()
  email: string;

  @ApiProperty({
    example: 'Technology',
    description: 'The sector of the organization',
  })
  @Column()
  sector: string;

  @ApiProperty({
    example: '+1234567890',
    description: 'The contact number of the organization',
  })
  @Column()
  contact: string;

  @ApiProperty({
    example: 'United States',
    description: 'The country where the organization is based',
  })
  @Column()
  country: string;

  @ApiProperty({
    example: 'private-key-string',
    description: 'The private key for the organization wallet',
  })
  @Column()
  walletPrivateKey: string;

  @ApiProperty({
    example: 'public-key-string',
    description: 'The public key for the organization wallet',
  })
  @Column()
  walletPublicKey: string;
}
