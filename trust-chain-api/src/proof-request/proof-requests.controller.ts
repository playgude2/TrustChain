import { Controller, Post, Body, Param } from '@nestjs/common';
import { ProofRequestsService } from './proof-requests.service';
import { CreateProofRequestDto } from './dtos/create-proof-request.dto';
import { RespondProofRequestDto } from './dtos/respond-proof-request.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('proof-requests')
@Controller('proof-requests')
export class ProofRequestsController {
  constructor(private readonly proofRequestsService: ProofRequestsService) {}

  @Post(':orgId/:userId')
  @ApiOperation({
    summary: 'Request proof of a specific credential from a user',
  })
  @ApiResponse({ status: 201, description: 'Proof request successfully sent' })
  async requestProof(
    @Param('orgId') orgId: number,
    @Param('userId') userId: number,
    @Body() createProofRequestDto: CreateProofRequestDto,
  ): Promise<{ message: string }> {
    const userName = await this.proofRequestsService.requestProof(
      orgId,
      userId,
      createProofRequestDto,
    );
    return { message: `Proof request sent to ${userName} successfully` };
  }

  @Post(':userId/respond/:proofRequestId')
  @ApiOperation({
    summary: 'Respond to a proof request',
  })
  @ApiResponse({ status: 200, description: 'Proof request response submitted' })
  async respondProof(
    @Param('userId') userId: number,
    @Param('proofRequestId') proofRequestId: number,
    @Body() respondProofRequestDto: RespondProofRequestDto,
  ): Promise<{ message: string }> {
    await this.proofRequestsService.respondProof(
      userId,
      proofRequestId,
      respondProofRequestDto,
    );
    return { message: 'Proof request response submitted successfully' };
  }
}
