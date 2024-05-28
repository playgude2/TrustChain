import {
  Controller,
  Post,
  Body,
  BadRequestException,
  Param,
  UseGuards,
  NotFoundException,
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
    try {
      const user = await this.usersService.registerUsers(createUserDto);
      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('login')
  @ApiOperation({ summary: 'Login a user' })
  @ApiResponse({
    status: 200,
    description: 'User successfully logged in',
    type: Users,
  })
  async login(@Body() loginUserDto: LoginUserDto) {
    try {
      const result = await this.usersService.validateUser(loginUserDto);
      return result;
    } catch (error) {
      throw new BadRequestException('Invalid credentials');
    }
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
    try {
      return await this.usersService.createWallet(userId);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
