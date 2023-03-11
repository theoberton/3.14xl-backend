import { Test, TestingModule } from '@nestjs/testing';
import { NftCollectionManagerService } from './nft-collection-manager.service';

describe('NftCollectionManagerService', () => {
  let service: NftCollectionManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NftCollectionManagerService],
    }).compile();

    service = module.get<NftCollectionManagerService>(
      NftCollectionManagerService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
