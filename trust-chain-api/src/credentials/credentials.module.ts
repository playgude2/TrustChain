import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CredentialsService } from './credentials.service';
import { CredentialsController } from './credentials.controller';
import { BlockchainService } from '../blockchain/blockchain.service';
import { Users } from 'src/users/entities/users.entity';
import { Organizations } from 'src/organizations/entities/organizations.entity';
import { BlockchainModule } from 'src/blockchain/blockchain.module';
import { Credentials } from './entities/credentials.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Credentials, Users, Organizations]),
    BlockchainModule,
  ],
  providers: [CredentialsService, BlockchainService],
  controllers: [CredentialsController],
})
export class CredentialsModule {}
