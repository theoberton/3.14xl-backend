import { Test, TestingModule } from '@nestjs/testing';
import { NftCollectionMintController } from './nft-collection-mint.controller';

describe('NftCollectionMintController', () => {
  let controller: NftCollectionMintController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NftCollectionMintController],
    }).compile();

    controller = module.get<NftCollectionMintController>(NftCollectionMintController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
