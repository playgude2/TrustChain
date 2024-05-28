import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organizations } from 'src/organizations/entities/organizations.entity';
import { BlockchainService } from '../blockchain/blockchain.service';

@Injectable()
export class SchemaService {
  constructor(
    @InjectRepository(Organizations)
    private readonly organizationsRepository: Repository<Organizations>,
    private readonly blockchainService: BlockchainService,
  ) {}

  async createSchema(orgId: number, schemaHash: string): Promise<void> {
    const organization = await this.organizationsRepository.findOne({
      where: { id: orgId },
    });
    if (!organization) {
      throw new NotFoundException('Organization not found');
    }

    await this.blockchainService.createSchema(schemaHash);
  }
}
