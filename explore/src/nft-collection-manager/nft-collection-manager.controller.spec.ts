import { Test, TestingModule } from '@nestjs/testing';
import { NftCollectionManagerController } from './nft-collection-manager.controller';

describe('NftCollectionManagerController', () => {
  let controller: NftCollectionManagerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NftCollectionManagerController],
    }).compile();

    controller = module.get<NftCollectionManagerController>(
      NftCollectionManagerController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
