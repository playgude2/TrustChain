import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { Users } from './entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WalletsService } from 'src/wallets/wallets.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    private readonly walletService: WalletsService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<Users> {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  async validateUser(loginUserDto: LoginUserDto): Promise<any> {
    const { email, password } = loginUserDto;
    const user = await this.usersRepository.findOne({
      where: { email, password },
    });

    if (user) {
      return user;
    }
    return null;
  }

  async createWallet(userId: number): Promise<Users> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { publicKey, privateKey, address } =
      this.walletService.createWallet();
    user.walletPublicKey = publicKey;
    user.walletPrivateKey = privateKey;
    user.walletAddress = address;

    return this.usersRepository.save(user);
  }
}
