import { Test, TestingModule } from '@nestjs/testing';
import { FamilyTreeController } from './family-tree.controller';

describe('FamilyTreeController', () => {
  let controller: FamilyTreeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FamilyTreeController],
    }).compile();

    controller = module.get<FamilyTreeController>(FamilyTreeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
