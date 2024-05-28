import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { Users } from './entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WalletsService } from 'src/wallets/wallets.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    private readonly walletService: WalletsService,
    private readonly jwtService: JwtService,
  ) {}

  async registerUsers(createUserDto: CreateUserDto): Promise<Users> {
    try {
      // Check if the email already exists
      const existingUser = await this.usersRepository.findOne({
        where: { email: createUserDto.email },
      });
      if (existingUser) {
        throw new Error('Email already exists');
      }

      // Create and save the new user
      const user = this.usersRepository.create(createUserDto);
      user.password = await bcrypt.hash(user.password, 10);
      user.did = `did:example:${user.email}-${Date.now()}`; // Generate a simple DID
      return await this.usersRepository.save(user);
    } catch (error) {
      // Handle specific error for email already exists
      if (error.message === 'Email already exists') {
        throw new BadRequestException('Email already exists');
      }
      // Log and throw other errors
      console.error('Error registering user:', error);
      throw new Error('Failed to register user');
    }
  }

  async validateUser(loginUserDto: LoginUserDto): Promise<any> {
    try {
      const { email, password } = loginUserDto;
      const user = await this.usersRepository.findOne({ where: { email } });

      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new UnauthorizedException('Invalid email or password');
      }

      console.log('user::', user);
      const payload = { sub: user.id, email: user.email };
      const accessToken = this.jwtService.sign(payload);

      return { accessToken, user };
    } catch (error) {
      console.error('Error validating user:', error);
      throw new UnauthorizedException('Invalid email or password');
    }
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
