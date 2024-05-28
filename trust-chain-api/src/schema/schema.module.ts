import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organizations } from 'src/organizations/entities/organizations.entity';
import { BlockchainModule } from '../blockchain/blockchain.module';
import { SchemaService } from './schema.service';
import { SchemaController } from './schema.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Organizations]), BlockchainModule],
  providers: [SchemaService],
  controllers: [SchemaController],
})
export class SchemaModule {}
