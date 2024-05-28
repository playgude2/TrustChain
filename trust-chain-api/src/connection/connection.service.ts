import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from 'src/users/entities/users.entity';
import { Organizations } from 'src/organizations/entities/organizations.entity';
import { BlockchainService } from '../blockchain/blockchain.service';
import { Connections } from './entities/connection.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ConnectionService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    @InjectRepository(Organizations)
    private readonly organizationsRepository: Repository<Organizations>,
    @InjectRepository(Connections)
    private readonly connectionRepository: Repository<Connections>,
    private readonly blockchainService: BlockchainService,
  ) {}

  async establishConnection(orgId: number, userId: number): Promise<string> {
    const organization = await this.organizationsRepository.findOne({
      where: { id: orgId },
    });
    if (!organization) {
      throw new NotFoundException('Organization not found');
    }

    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const existingConnection = await this.connectionRepository.findOne({
      where: { organization: { id: orgId }, user: { id: userId } },
    });

    if (existingConnection) {
      throw new ConflictException('Connection already exists');
    }

    await this.blockchainService.establishConnection(user.walletAddress);

    const connectionId = uuidv4();
    const connection = this.connectionRepository.create({
      organization,
      user,
      connectionId,
    });
    await this.connectionRepository.save(connection);

    return connectionId;
  }
}
