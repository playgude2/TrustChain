import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProofRequestsService } from './proof-requests.service';
import { ProofRequestsController } from './proof-requests.controller';
import { ProofRequest } from './entities/proof-request.entity';
import { Users } from 'src/users/entities/users.entity';
import { Organizations } from 'src/organizations/entities/organizations.entity';
import { BlockchainModule } from 'src/blockchain/blockchain.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProofRequest, Users, Organizations]),
    BlockchainModule,
  ],
  controllers: [ProofRequestsController],
  providers: [ProofRequestsService],
})
export class ProofRequestsModule {}
