import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { WalletsModule } from './wallets/wallets.module';
import { BlockchainModule } from './blockchain/blockchain.module';
import { CredentialsModule } from './credentials/credentials.module';
// import { CredentialRequestsModule } from './credential-requests/credential-requests.module';
import { SchemaModule } from './schema/schema.module';
import { ConnectionModule } from './connection/connection.module';
import { ProofRequestsModule } from './proof-request/proof-requests.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres', // Change to 'mysql' if using MySQL
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Set to false in production
    }),
    UsersModule,
    AuthModule,
    OrganizationsModule,
    WalletsModule,
    BlockchainModule,
    CredentialsModule,
    // CredentialRequestsModule,
    SchemaModule,
    ConnectionModule,
    ProofRequestsModule,
  ],
})
export class AppModule {}
