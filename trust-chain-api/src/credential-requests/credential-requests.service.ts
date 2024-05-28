// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { CredentialRequests } from './entities/credential-requests.entity';
// import { Users } from 'src/users/entities/users.entity';
// import { Organizations } from 'src/organizations/entities/organizations.entity';
// import { BlockchainService } from '../blockchain/blockchain.service';

// @Injectable()
// export class CredentialRequestsService {
//   constructor(
//     @InjectRepository(CredentialRequests)
//     private readonly credentialRequestsRepository: Repository<CredentialRequests>,
//     @InjectRepository(Users)
//     private readonly usersRepository: Repository<Users>,
//     @InjectRepository(Organizations)
//     private readonly organizationsRepository: Repository<Organizations>,
//     private readonly blockchainService: BlockchainService,
//   ) {}

//   async requestVerification(
//     userId: number,
//     orgId: number,
//     documentHash: string,
//   ): Promise<CredentialRequests> {
//     const user = await this.usersRepository.findOne({ where: { id: userId } });
//     if (!user) {
//       throw new NotFoundException('User not found');
//     }

//     const organization = await this.organizationsRepository.findOne({
//       where: { id: orgId },
//     });
//     if (!organization) {
//       throw new NotFoundException('Organization not found');
//     }

//     await this.blockchainService.requestProof(user.walletAddress, documentHash);

//     const credentialRequest = this.credentialRequestsRepository.create({
//       user,
//       requester: organization,
//       documentHash,
//     });

//     return this.credentialRequestsRepository.save(credentialRequest);
//   }

//   async verifyCredential(
//     userId: number,
//     documentHash: string,
//   ): Promise<boolean> {
//     const user = await this.usersRepository.findOne({ where: { id: userId } });
//     if (!user) {
//       throw new NotFoundException('User not found');
//     }

//     return this.blockchainService.verifyCredential(
//       user.walletAddress,
//       documentHash,
//     );
//   }

//   async respondVerification(
//     requestId: number,
//     isValid: boolean,
//   ): Promise<void> {
//     const request = await this.credentialRequestsRepository.findOne({
//       where: { id: requestId },
//       relations: ['user'],
//     });
//     if (!request) {
//       throw new NotFoundException('Credential request not found');
//     }
//     // isValid = false;
//     await this.blockchainService.respondProof(request.id, isValid);
//   }
// }
