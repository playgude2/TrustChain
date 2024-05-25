import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';

@Injectable()
export class WalletsService {
  createWallet() {
    const wallet = ethers.Wallet.createRandom();
    console.log('wallet:::', wallet);
    return {
      privateKey: wallet.privateKey,
      publicKey: wallet.publicKey,
      address: wallet.address,
    };
  }
}
