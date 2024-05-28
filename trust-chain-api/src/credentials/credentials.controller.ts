import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CredentialsService } from './credentials.service';
import { CreateCredentialDto } from './dtos/create-credential.dto';
import { Credentials } from './entities/credentials.entity';

@ApiTags('credentials')
@Controller('credentials')
export class CredentialsController {
  constructor(private readonly credentialsService: CredentialsService) {}

  @Post(':orgId/issue')
  @ApiOperation({ summary: 'Issue a credential to a user' })
  @ApiResponse({
    status: 201,
    description: 'Credential successfully issued',
    type: Credentials,
  })
  async issueCredential(
    @Param('orgId') orgId: number,
    @Body() createCredentialDto: CreateCredentialDto,
  ): Promise<Credentials> {
    return this.credentialsService.issueCredential(orgId, createCredentialDto);
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Get credentials for a user' })
  @ApiResponse({
    status: 200,
    description: 'List of user credentials',
    type: [Credentials],
  })
  async getUserCredentials(
    @Param('userId') userId: number,
  ): Promise<Credentials[]> {
    return this.credentialsService.getUserCredentials(userId);
  }

  @Get('verify/:credentialId')
  @ApiOperation({ summary: 'Verify a credential' })
  @ApiResponse({
    status: 200,
    description: 'Credential verification status',
    type: Boolean,
  })
  async verifyCredential(
    @Param('credentialId') credentialId: number,
  ): Promise<boolean> {
    return this.credentialsService.verifyCredential(credentialId);
  }
}
