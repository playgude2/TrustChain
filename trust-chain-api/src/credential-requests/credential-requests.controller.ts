// import { Controller, Post, Body, Param, UseGuards } from '@nestjs/common';
// import { CredentialRequestsService } from './credential-requests.service';
// import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
// import { CreateVerificationRequestDto } from './dtos/create-verification-request.dto';
// import {
//   ApiBearerAuth,
//   ApiTags,
//   ApiOperation,
//   ApiResponse,
// } from '@nestjs/swagger';

// @ApiTags('credential-requests')
// @Controller('credential-requests')
// export class CredentialRequestsController {
//   constructor(
//     private readonly credentialRequestsService: CredentialRequestsService,
//   ) {}

//   @UseGuards(JwtAuthGuard)
//   @ApiBearerAuth('access-token')
//   @Post(':orgId/request-verification/:userId')
//   @ApiOperation({ summary: 'Request credential verification' })
//   @ApiResponse({
//     status: 200,
//     description: 'Verification request sent.',
//   })
//   async requestVerification(
//     @Param('userId') userId: number,
//     @Param('orgId') orgId: number,
//     @Body() createVerificationRequestDto: CreateVerificationRequestDto,
//   ) {
//     return this.credentialRequestsService.requestVerification(
//       userId,
//       orgId,
//       createVerificationRequestDto.documentHash,
//     );
//   }

//   @UseGuards(JwtAuthGuard)
//   @ApiBearerAuth('access-token')
//   @Post(':userId/verify')
//   @ApiOperation({ summary: 'Verify a credential' })
//   @ApiResponse({
//     status: 200,
//     description: 'Credential verification status.',
//   })
//   async verifyCredential(
//     @Param('userId') userId: number,
//     @Body() createVerificationRequestDto: CreateVerificationRequestDto,
//   ) {
//     return this.credentialRequestsService.verifyCredential(
//       userId,
//       createVerificationRequestDto.documentHash,
//     );
//   }

//   @UseGuards(JwtAuthGuard)
//   @ApiBearerAuth('access-token')
//   @Post(':requestId/respond')
//   @ApiOperation({ summary: 'Respond to credential verification request' })
//   @ApiResponse({
//     status: 200,
//     description: 'Credential verification response sent.',
//   })
//   async respondVerification(
//     @Param('requestId') requestId: number,
//     @Body('isValid') isValid: boolean,
//   ) {
//     return this.credentialRequestsService.respondVerification(
//       requestId,
//       isValid,
//     );
//   }
// }
