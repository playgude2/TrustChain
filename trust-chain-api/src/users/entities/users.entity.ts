import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Credentials } from 'src/credentials/entities/credentials.entity';
import { Connections } from 'src/connection/entities/connection.entity';
import { AbstractEntity } from 'src/common/entities/base.entity';
import { ProofRequest } from 'src/proof-request/entities/proof-request.entity';

@Entity()
export class Users extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'John' })
  @IsString()
  @Column({ nullable: true })
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  @Column({ nullable: true })
  lastName: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email of the user',
  })
  @Column()
  email: string;

  @ApiProperty({
    example: 'password',
    description: 'The password of the user',
  })
  @Column()
  password: string;

  @ApiProperty({
    example: 'wallet-address',
    description: 'The wallet address of the user',
  })
  @Column({ nullable: true })
  walletAddress: string;

  @ApiProperty({
    example: 'did:example:123456789abcdefghi',
    description: 'The Decentralized Identifier for the user',
  })
  @Column({ nullable: true })
  did: string;

  @ApiProperty({
    example: 'public-key-string',
    description: 'The public key for the user wallet',
  })
  @Column({ nullable: true })
  walletPublicKey: string;

  @ApiProperty({
    example: 'private-key-string',
    description: 'The private key for the user wallet',
  })
  @Column({ nullable: true })
  walletPrivateKey: string;

  @OneToMany(() => Credentials, (credentials) => credentials.user)
  credentials: Credentials[];

  @OneToMany(() => ProofRequest, (proofRequest) => proofRequest.recipient)
  proofRequests: ProofRequest[];

  @OneToMany(() => Connections, (connections) => connections.user)
  connections: Connections[];
}
