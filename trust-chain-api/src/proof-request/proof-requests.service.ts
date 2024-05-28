import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from 'src/users/entities/users.entity';
import { BlockchainService } from '../blockchain/blockchain.service';
import { CreateProofRequestDto } from './dtos/create-proof-request.dto';
import { ProofRequest } from './entities/proof-request.entity';
import { Organizations } from 'src/organizations/entities/organizations.entity';
import { RespondProofRequestDto } from './dtos/respond-proof-request.dto';

@Injectable()
export class ProofRequestsService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    @InjectRepository(Organizations)
    private readonly organizationsRepository: Repository<Organizations>,
    @InjectRepository(ProofRequest)
    private readonly proofRequestRepository: Repository<ProofRequest>,
    private readonly blockchainService: BlockchainService,
  ) {}

  async requestProof(
    orgId: number,
    userId: number,
    createProofRequestDto: CreateProofRequestDto,
  ): Promise<string> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const organization = await this.organizationsRepository.findOne({
      where: { id: orgId },
    });
    if (!organization) throw new NotFoundException('Organization not found');

    // Request proof on the blockchain
    await this.blockchainService.requestProof(
      user.walletAddress,
      createProofRequestDto.documentHash,
    );

    // Create a proof request entry in the database
    const proofRequest = this.proofRequestRepository.create({
      requester: organization,
      recipient: user,
      documentHash: createProofRequestDto.documentHash,
    });

    await this.proofRequestRepository.save(proofRequest);

    return `${user.firstName} ${user.lastName}`;
  }

  // Updated respondProof method with proper logging and recipient comparison
  async respondProof(
    userId: number,
    proofRequestId: number,
    respondProofRequestDto: RespondProofRequestDto,
  ): Promise<void> {
    try {
      const user = await this.usersRepository.findOne({
        where: { id: userId },
      });
      if (!user) {
        console.error(`User with ID ${userId} not found`);
        throw new NotFoundException('User not found');
      }

      // Retrieve the specific proof request by ID and user entity
      const proofRequest = await this.proofRequestRepository.findOne({
        where: { id: proofRequestId, recipient: { id: userId } },
      });
      console.log('user:::', user);
      console.log('proofRequest:::', proofRequest);
      if (!proofRequest) {
        console.error(
          `Proof request with ID ${proofRequestId} not found for user ${userId}`,
        );
        throw new NotFoundException('Proof request not found');
      }

      // Respond to the proof request on the blockchain
      console.log(
        `Responding to proof request with ID ${proofRequestId} for user ${userId}`,
      );
      await this.blockchainService.respondProof(
        proofRequestId,
        respondProofRequestDto.isValid,
        respondProofRequestDto.proof,
      );

      // Update the proof request status in the database
      proofRequest.responded = true;
      proofRequest.valid = respondProofRequestDto.isValid;
      proofRequest.proof = respondProofRequestDto.proof;

      await this.proofRequestRepository.save(proofRequest);
      console.log(
        `Successfully responded to proof request with ID ${proofRequestId} for user ${userId}`,
      );
    } catch (error) {
      console.error(
        `Failed to respond to proof request with ID ${proofRequestId} for user ${userId}: ${error.message}`,
      );
      throw error;
    }
  }
}
