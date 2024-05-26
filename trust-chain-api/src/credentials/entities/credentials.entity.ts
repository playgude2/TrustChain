import { ApiProperty } from '@nestjs/swagger';
import { Organizations } from 'src/organizations/entities/organizations.entity';
import { Users } from 'src/users/entities/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Credentials {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the credential',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: {
      name: 'John Doe',
      age: 25,
      department: 'Computer Science',
      year: 'Senior',
      location: '123 Main St, Anytown, USA',
    },
    description: 'The dynamic data associated with the credential',
  })
  @Column('jsonb')
  data: Record<string, any>; // Store credential data dynamically

  @ApiProperty({
    example: 'Student ID Card',
    description: 'Name of the credential being issued',
  })
  @Column({ nullable: true }) // Make this column temporarily nullable
  credentialName: string; // Name of the credential

  @ApiProperty({
    example:
      '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
    description: 'The blockchain transaction hash or credential ID',
  })
  @Column()
  blockchainHash: string; // Store the blockchain transaction hash or credential ID

  @Column({ nullable: true })
  documentHash: string; // Add this column

  @ApiProperty({ type: () => Organizations })
  @ManyToOne(() => Organizations, (organization) => organization.credentials)
  organization: Organizations;

  @ApiProperty({ type: () => Users })
  @ManyToOne(() => Users, (user) => user.credentials)
  user: Users;
}
