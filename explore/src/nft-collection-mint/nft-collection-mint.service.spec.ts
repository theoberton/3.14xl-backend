import { Test, TestingModule } from '@nestjs/testing';
import { NftCollectionMintService } from './nft-collection-mint.service';

describe('NftCollectionMintService', () => {
  let service: NftCollectionMintService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NftCollectionMintService],
    }).compile();

    service = module.get<NftCollectionMintService>(NftCollectionMintService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
