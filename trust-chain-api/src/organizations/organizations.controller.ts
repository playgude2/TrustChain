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
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { OrganizationsService } from './organizations.service';
import { CreateOrganizationDto } from './dtos/create-organization.dto';
import { Organizations } from './entities/organizations.entity';
import { UpdateOrganizationDto } from './dtos/update-organization.dto';

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
  create(
    @Body() createOrganizationDto: CreateOrganizationDto,
  ): Promise<Organizations> {
    return this.organizationsService.create(createOrganizationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all organizations' })
  @ApiResponse({
    status: 200,
    description: 'List of all organizations',
    type: [Organizations],
  })
  findAll(): Promise<Organizations[]> {
    return this.organizationsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve an organization by ID' })
  @ApiResponse({
    status: 200,
    description: 'The organization details',
    type: Organizations,
  })
  @ApiResponse({ status: 404, description: 'Organization not found' })
  findOne(@Param('id') id: number): Promise<Organizations> {
    return this.organizationsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an organization by ID' })
  @ApiResponse({
    status: 200,
    description: 'The organization has been successfully updated.',
    type: Organizations,
  })
  @ApiResponse({ status: 404, description: 'Organization not found' })
  update(
    @Param('id') id: number,
    @Body() updateOrganizationDto: UpdateOrganizationDto,
  ): Promise<Organizations> {
    return this.organizationsService.update(id, updateOrganizationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an organization by ID' })
  @ApiResponse({
    status: 200,
    description: 'The organization has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Organization not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: number): Promise<void> {
    return this.organizationsService.remove(id);
  }
}
