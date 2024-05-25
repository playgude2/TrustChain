import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
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

  @ApiProperty({
    example: 'wallet-address',
    description: 'The wallet adress',
  })
  @Column({ nullable: true })
  walletAdress: string;
}
