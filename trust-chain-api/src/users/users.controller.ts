import {
  Controller,
  Post,
  Body,
  BadRequestException,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Users } from './entities/users.entity';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description: 'User successfully registered',
    type: Users,
  })
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.registerUsers(createUserDto);
    return user;
  }

  @Post('login')
  @ApiOperation({ summary: 'Login a user' })
  @ApiResponse({
    status: 200,
    description: 'User successfully logged in',
    type: Users,
  })
  async login(@Body() loginUserDto: LoginUserDto) {
    const result = await this.usersService.validateUser(loginUserDto);
    if (!result) {
      throw new BadRequestException('Invalid credentials');
    }
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Post(':id/create-wallet')
  @ApiOperation({ summary: 'Create a wallet for a user' })
  @ApiResponse({
    status: 200,
    description: 'Wallet successfully created for user.',
  })
  async createWallet(@Param('id') userId: number) {
    return this.usersService.createWallet(userId);
  }
}
