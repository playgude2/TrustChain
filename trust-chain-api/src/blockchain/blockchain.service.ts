import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ethers } from 'ethers';

@Injectable()
export class BlockchainService {
  private readonly provider: ethers.providers.JsonRpcProvider;
  private readonly signer: ethers.Wallet;
  private readonly contract: ethers.Contract;

  constructor(private configService: ConfigService) {
    const providerUrl = this.configService.get<string>('PROVIDER_URL');
    const privateKey = this.configService.get<string>('PRIVATE_KEY');
    const contractAddress = this.configService.get<string>('CONTRACT_ADDRESS');

    console.log('Connecting to blockchain with the following parameters:');
    console.log(`Provider URL: ${providerUrl}`);
    console.log(`Private Key: ${privateKey}`);
    console.log(`Contract Address: ${contractAddress}`);

    this.provider = new ethers.providers.JsonRpcProvider(providerUrl);
    this.signer = new ethers.Wallet(privateKey, this.provider);

    const contractAbi = [
      'function createCredentialDefinition(string definitionName, uint256 version) public',
      'function issueCredential(address recipient, string documentHash, string[] memory keys, string[] memory values) public',
      'function revokeCredential(address recipient, string documentHash) public',
      'function verifyCredential(address recipient, string documentHash) public view returns (bool)',
      'function updateCredentialDefinition(address organization, uint256 definitionIndex, uint256 newVersion) public',
      'function getCredentialAttribute(address recipient, uint256 credentialIndex, string memory key) public view returns (string memory)',
      'function requestProof(address recipient, string documentHash) public',
      'function respondProof(uint256 requestIndex, bool isValid) public',
    ];

    this.contract = new ethers.Contract(
      contractAddress,
      contractAbi,
      this.signer,
    );
  }

  async createCredentialDefinition(
    definitionName: string,
    version: number,
  ): Promise<void> {
    const tx = await this.contract.createCredentialDefinition(
      definitionName,
      version,
    );
    await tx.wait();
  }

  async issueCredential(
    recipient: string,
    documentHash: string,
    keys: string[],
    values: string[],
  ): Promise<string> {
    const tx = await this.contract.issueCredential(
      recipient,
      documentHash,
      keys,
      values,
    );
    const receipt = await tx.wait();
    return receipt.transactionHash;
  }

  async revokeCredential(
    recipient: string,
    documentHash: string,
  ): Promise<void> {
    const tx = await this.contract.revokeCredential(recipient, documentHash);
    await tx.wait();
  }

  async verifyCredential(
    recipient: string,
    documentHash: string,
  ): Promise<boolean> {
    return this.contract.verifyCredential(recipient, documentHash);
  }

  async updateCredentialDefinition(
    organization: string,
    definitionIndex: number,
    newVersion: number,
  ): Promise<void> {
    const tx = await this.contract.updateCredentialDefinition(
      organization,
      definitionIndex,
      newVersion,
    );
    await tx.wait();
  }

  async getCredentialAttribute(
    recipient: string,
    credentialIndex: number,
    key: string,
  ): Promise<string> {
    return this.contract.getCredentialAttribute(
      recipient,
      credentialIndex,
      key,
    );
  }

  async requestProof(recipient: string, documentHash: string): Promise<void> {
    const tx = await this.contract.requestProof(recipient, documentHash);
    await tx.wait();
  }

  async respondProof(requestIndex: number, isValid: boolean): Promise<void> {
    const tx = await this.contract.respondProof(requestIndex, isValid);
    await tx.wait();
  }
}
