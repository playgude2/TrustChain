import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class RespondProofRequestDto {
  @ApiProperty({
    example: true,
    description: 'Indicates if the proof is valid',
  })
  @IsBoolean()
  isValid: boolean;

  @ApiProperty({ example: 'proof-data', description: 'The proof data' })
  @IsString()
  proof: string;
}
