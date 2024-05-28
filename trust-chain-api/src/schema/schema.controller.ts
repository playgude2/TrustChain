import { Controller, Post, Body, Param } from '@nestjs/common';
import { SchemaService } from './schema.service';

@Controller('schema')
export class SchemaController {
  constructor(private readonly schemaService: SchemaService) {}

  @Post(':orgId')
  async createSchema(
    @Param('orgId') orgId: number,
    @Body('schemaHash') schemaHash: string,
  ): Promise<void> {
    await this.schemaService.createSchema(orgId, schemaHash);
  }
}
