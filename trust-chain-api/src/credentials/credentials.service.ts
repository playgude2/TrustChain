import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCredentialDto } from './dtos/create-credential.dto';
import { BlockchainService } from '../blockchain/blockchain.service';
import { Users } from 'src/users/entities/users.entity';
import { Organizations } from 'src/organizations/entities/organizations.entity';
import { Credentials } from './entities/credentials.entity';
import { createHash } from 'crypto';

@Injectable()
export class CredentialsService {
  constructor(
    @InjectRepository(Credentials)
    private readonly credentialsRepository: Repository<Credentials>,
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    @InjectRepository(Organizations)
    private readonly organizationsRepository: Repository<Organizations>,
    private readonly blockchainService: BlockchainService,
  ) {}

  // Helper function to generate document hash
  private generateDocumentHash(data: Record<string, any>): string {
    const hash = createHash('sha256');
    hash.update(JSON.stringify(data));
    return hash.digest('hex');
  }

  async issueCredential(
    orgId: number,
    createCredentialDto: CreateCredentialDto,
  ): Promise<Credentials> {
    const organization = await this.organizationsRepository.findOne({
      where: { id: orgId },
    });
    if (!organization) {
      throw new NotFoundException('Organization not found');
    }

    const user = await this.usersRepository.findOne({
      where: { id: createCredentialDto.userId },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Add the credential name to the data
    const credentialData = {
      credentialName: createCredentialDto.credentialName,
      ...createCredentialDto.data,
    };

    const keys = Object.keys(credentialData);
    const values = Object.values(credentialData).map((value) =>
      value.toString(),
    );

    // Generate the document hash
    const documentHash = this.generateDocumentHash(credentialData);

    // Create credential on blockchain and get the transaction hash
    const blockchainHash = await this.blockchainService.issueCredential(
      user.walletAddress,
      documentHash,
      keys,
      values,
      organization.did, // issuerDID
      user.did, // recipientDID
    );

    // Save credential in the database
    const credential = this.credentialsRepository.create({
      data: credentialData,
      credentialName: createCredentialDto.credentialName,
      documentHash, // Store the generated document hash
      blockchainHash,
      organization,
      user,
    });

    return this.credentialsRepository.save(credential);
  }

  async getUserCredentials(userId: number): Promise<Credentials[]> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.credentialsRepository.find({
      where: { user: { id: userId } },
      relations: ['organization'],
    });
  }

  async verifyCredential(credentialId: number): Promise<boolean> {
    const credential = await this.credentialsRepository.findOne({
      where: { id: credentialId },
      relations: ['user'], // Correct relation property name
    });

    if (!credential) {
      throw new NotFoundException('Credential not found');
    }

    console.log('credential details:::', credential);
    // Implement verification logic using blockchain
    const isValid = await this.blockchainService.verifyCredential(
      credential.user.walletAddress,
      credential.documentHash, // Use documentHash for verification
    );
    return isValid;
  }
}
