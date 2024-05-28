import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateVerificationRequestDto {
  @ApiProperty({
    example: 'document-hash-value',
    description: 'The hash of the document to verify',
  })
  @IsString()
  documentHash: string;
}
