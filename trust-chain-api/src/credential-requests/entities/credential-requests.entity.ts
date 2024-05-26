import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Organizations } from 'src/organizations/entities/organizations.entity';
import { Users } from 'src/users/entities/users.entity';

@Entity()
export class CredentialRequests {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  documentHash: string;

  @ManyToOne(() => Users, (user) => user.requests)
  user: Users;

  @ManyToOne(() => Organizations, (organization) => organization.requests)
  requester: Organizations;
}
