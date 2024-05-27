import { ApiProperty } from '@nestjs/swagger';
import { CredentialRequests } from 'src/credential-requests/entities/credential-requests.entity';
import { Credentials } from 'src/credentials/entities/credentials.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Users {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the user',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'John',
    description: 'The first name of the user',
  })
  @Column({ nullable: true })
  firstName: string;

  @ApiProperty({
    example: 'Doe',
    description: 'The last name of the user',
  })
  @Column({ nullable: true })
  lastName: string;

  @ApiProperty({
    example: 'strongpassword',
    description: 'The password for the user',
  })
  @Column()
  password: string;

  @ApiProperty({
    example: 'john@gmail.com',
    description: 'The contact email of the user',
  })
  @Column()
  email: string;

  @ApiProperty({
    example: 'private-key-string',
    description: 'The private key for the user wallet',
  })
  @Column({ nullable: true })
  walletPrivateKey: string;

  @ApiProperty({
    example: 'public-key-string',
    description: 'The public key for the user wallet',
  })
  @Column({ nullable: true })
  walletPublicKey: string;

  @ApiProperty({
    example: 'wallet-address',
    description: 'The wallet address',
  })
  @Column({ nullable: true })
  walletAddress: string;

  @OneToMany(() => Credentials, (credentials) => credentials.user)
  credentials: Credentials[];

  @OneToMany(() => CredentialRequests, (requests) => requests.user)
  requests: CredentialRequests[];
}
