import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Credentials } from 'src/credentials/entities/credentials.entity';
import { CredentialRequests } from 'src/credential-requests/entities/credential-requests.entity';
import { AbstractEntity } from 'src/common/entities/base.entity';

@Entity()
export class Organizations extends AbstractEntity {
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

  @ApiProperty({
    example: 'wallet-address',
    description: 'The wallet adress',
  })
  @Column({ nullable: true })
  walletAdress: string;

  @OneToMany(() => Credentials, (credentials) => credentials.organization)
  credentials: Credentials[];

  @OneToMany(() => CredentialRequests, (requests) => requests.requester)
  requests: CredentialRequests[];
}
