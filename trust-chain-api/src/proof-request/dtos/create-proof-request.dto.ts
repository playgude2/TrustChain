import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateProofRequestDto {
  @ApiProperty({
    example: '0x123...',
    description: 'Document hash of the credential',
  })
  @IsString()
  documentHash: string;
}
