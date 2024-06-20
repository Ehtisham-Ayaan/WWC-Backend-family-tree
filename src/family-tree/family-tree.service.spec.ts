import { Test, TestingModule } from '@nestjs/testing';
import { FamilyTreeService } from './family-tree.service';

describe('FamilyTreeService', () => {
  let service: FamilyTreeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FamilyTreeService],
    }).compile();

    service = module.get<FamilyTreeService>(FamilyTreeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
