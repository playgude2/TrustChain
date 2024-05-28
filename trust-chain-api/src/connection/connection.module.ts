import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/users/entities/users.entity';
import { Organizations } from 'src/organizations/entities/organizations.entity';
import { BlockchainModule } from '../blockchain/blockchain.module';
import { ConnectionService } from './connection.service';
import { ConnectionController } from './connection.controller';
import { Connections } from './entities/connection.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, Organizations, Connections]),
    BlockchainModule,
  ],
  providers: [ConnectionService],
  controllers: [ConnectionController],
})
export class ConnectionModule {}
