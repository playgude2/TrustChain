import { Test, TestingModule } from '@nestjs/testing';
import { CredentialRequestsService } from './credential-requests.service';

describe('CredentialRequestsService', () => {
  let service: CredentialRequestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CredentialRequestsService],
    }).compile();

    service = module.get<CredentialRequestsService>(CredentialRequestsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
