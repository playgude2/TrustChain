import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class EstablishConnectionDto {
  @ApiProperty({
    example: 1,
    description: 'The ID of the organization',
  })
  @IsNumber()
  orgId: number;

  @ApiProperty({
    example: 1,
    description: 'The ID of the user',
  })
  @IsNumber()
  userId: number;
}
