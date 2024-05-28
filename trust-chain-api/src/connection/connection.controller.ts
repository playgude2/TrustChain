import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ConnectionService } from './connection.service';
import { EstablishConnectionDto } from './dtos/establish-connection.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('connections')
@Controller('connections')
export class ConnectionController {
  constructor(private readonly connectionService: ConnectionService) {}

  @Post()
  @ApiOperation({
    summary: 'Establish a connection between an organization and a user',
  })
  @ApiResponse({
    status: 201,
    description: 'Connection successfully established',
  })
  @HttpCode(HttpStatus.CREATED)
  async establishConnection(
    @Body() establishConnectionDto: EstablishConnectionDto,
  ): Promise<{ message: string; connectionId: string }> {
    const connectionId = await this.connectionService.establishConnection(
      establishConnectionDto.orgId,
      establishConnectionDto.userId,
    );
    return {
      message: 'Connection successfully established',
      connectionId: connectionId,
    };
  }
}
