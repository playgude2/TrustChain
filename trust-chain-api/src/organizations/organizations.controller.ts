import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { OrganizationsService } from './organizations.service';
import { Organizations } from './entities/organizations.entity';
import { CreateOrganizationDto } from './dtos/create-organization.dto';
import { LoginOrganizationDto } from './dtos/login-organization.dto';
import { UpdateOrganizationDto } from './dtos/update-organization.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('organizations')
@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new organization' })
  @ApiResponse({
    status: 201,
    description: 'The organization has been successfully created.',
    type: Organizations,
  })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createOrganizationDto: CreateOrganizationDto,
  ): Promise<Organizations> {
    try {
      return await this.organizationsService.create(createOrganizationDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get()
  @ApiOperation({ summary: 'Retrieve all organizations' })
  @ApiResponse({
    status: 200,
    description: 'List of all organizations',
    type: [Organizations],
  })
  async findAll(): Promise<Organizations[]> {
    return this.organizationsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get(':id')
  @ApiOperation({ summary: 'Retrieve an organization by ID' })
  @ApiResponse({
    status: 200,
    description: 'The organization details',
    type: Organizations,
  })
  @ApiResponse({ status: 404, description: 'Organization not found' })
  async findOne(@Param('id') id: number): Promise<Organizations> {
    try {
      return await this.organizationsService.findOne(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Put(':id')
  @ApiOperation({ summary: 'Update an organization by ID' })
  @ApiResponse({
    status: 200,
    description: 'The organization has been successfully updated.',
    type: Organizations,
  })
  @ApiResponse({ status: 404, description: 'Organization not found' })
  async update(
    @Param('id') id: number,
    @Body() updateOrganizationDto: UpdateOrganizationDto,
  ): Promise<Organizations> {
    try {
      return await this.organizationsService.update(id, updateOrganizationDto);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Delete(':id')
  @ApiOperation({ summary: 'Delete an organization by ID' })
  @ApiResponse({
    status: 200,
    description: 'The organization has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Organization not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: number): Promise<void> {
    try {
      return await this.organizationsService.remove(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Post('login')
  @ApiOperation({ summary: 'Login an organization' })
  @ApiResponse({
    status: 200,
    description: 'The organization has been successfully logged in.',
    type: String,
  })
  @ApiResponse({ status: 401, description: 'Invalid email or password.' })
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginOrganizationDto: LoginOrganizationDto,
  ): Promise<{ accessToken: string; organization: any }> {
    try {
      return await this.organizationsService.login(loginOrganizationDto);
    } catch (error) {
      throw new UnauthorizedException('Invalid email or password');
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Post(':id/create-wallet')
  @ApiOperation({ summary: 'Create a wallet for an organization' })
  @ApiResponse({
    status: 200,
    description: 'Wallet successfully created for organization.',
  })
  async createWallet(@Param('id') organizationId: number) {
    try {
      return await this.organizationsService.createWallet(organizationId);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
