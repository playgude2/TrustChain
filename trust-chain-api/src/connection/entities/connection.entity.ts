import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Organizations } from 'src/organizations/entities/organizations.entity';
import { Users } from 'src/users/entities/users.entity';

@Entity()
export class Connections {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the connection',
  })
  id: number;

  @ManyToOne(() => Organizations, (organization) => organization.connections, {
    eager: true,
  })
  @ApiProperty({
    description: 'The organization involved in the connection',
    type: () => Organizations,
  })
  organization: Organizations;

  @ManyToOne(() => Users, (user) => user.connections, { eager: true })
  @ApiProperty({
    description: 'The user involved in the connection',
    type: () => Users,
  })
  user: Users;

  @Column({ unique: true, nullable: true })
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'The unique connection ID',
  })
  connectionId: string;
}
