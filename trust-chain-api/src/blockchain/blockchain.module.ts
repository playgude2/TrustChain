import { Module } from '@nestjs/common';
import { BlockchainService } from './blockchain.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [BlockchainService],
  exports: [BlockchainService],
})
export class BlockchainModule {}
