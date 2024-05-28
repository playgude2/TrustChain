import { IsString, IsInt, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCredentialDto {
  @ApiProperty({ example: 'Student ID Card' })
  @IsString()
  readonly credentialName: string;

  @ApiProperty({
    example: {
      name: 'John Doe',
      age: 25,
      department: 'Computer Science',
      year: 'Senior',
      location: '123 Main St, Anytown, USA',
    },
  })
  @IsObject()
  readonly data: Record<string, any>;

  @ApiProperty({ example: 1 })
  @IsInt()
  readonly userId: number;
}
