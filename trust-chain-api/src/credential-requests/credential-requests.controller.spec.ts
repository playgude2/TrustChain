import { Test, TestingModule } from '@nestjs/testing';
import { CredentialRequestsController } from './credential-requests.controller';

describe('CredentialRequestsController', () => {
  let controller: CredentialRequestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CredentialRequestsController],
    }).compile();

    controller = module.get<CredentialRequestsController>(
      CredentialRequestsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
