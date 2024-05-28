import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Users } from 'src/users/entities/users.entity';
import { Organizations } from 'src/organizations/entities/organizations.entity';

@Entity()
export class ProofRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: '0x123...',
    description: 'Document hash of the credential',
  })
  @Column()
  documentHash: string;

  @ApiProperty({
    example: 'true',
    description: 'Indicates if the proof is valid',
  })
  @Column({ default: false })
  valid: boolean;

  @ApiProperty({
    example: 'proof-data',
    description: 'The proof data',
  })
  @Column({ nullable: true })
  proof: string;

  @ApiProperty({
    example: 'false',
    description: 'Indicates if the proof request has been responded to',
  })
  @Column({ default: false })
  responded: boolean;

  @ApiProperty({ type: () => Users })
  @ManyToOne(() => Users, (user) => user.proofRequests)
  recipient: Users;

  @ApiProperty({ type: () => Organizations })
  @ManyToOne(() => Organizations, (organization) => organization.proofRequests)
  requester: Organizations;
}
