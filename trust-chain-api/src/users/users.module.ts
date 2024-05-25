import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { WalletsModule } from 'src/wallets/wallets.module';

@Module({
  imports: [TypeOrmModule.forFeature([Users]), WalletsModule],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService], // Make sure UsersService is exported
})
export class UsersModule {}
