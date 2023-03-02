import { Test, TestingModule } from '@nestjs/testing';
import { ConverstionsService } from './converstions.service';

describe('ConverstionsServiceService', () => {
  let service: ConverstionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConverstionsService],
    }).compile();

    service = module.get<ConverstionsService>(ConverstionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
