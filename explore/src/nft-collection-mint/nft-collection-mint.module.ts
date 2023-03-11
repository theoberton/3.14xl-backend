import { Module } from '@nestjs/common';
import { NftCollectionMintService } from './nft-collection-mint.service';
import { NftCollectionMintController } from './nft-collection-mint.controller';
import { NftCollectionManagerService } from './../nft-collection-manager/nft-collection-manager.service';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { NftCollectionMintSchema } from './nft-collection-mint.entity';
import { NftCollectionManagerSchema } from '../nft-collection-manager/nft-collection-manager.entity';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      {
        name: 'NftCollectionManager',
        schema: NftCollectionManagerSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: 'NftCollectionMint',
        schema: NftCollectionMintSchema,
      },
    ]),
  ],
  controllers: [NftCollectionMintController],
  providers: [NftCollectionMintService, NftCollectionManagerService],
})
export class NftCollectionMintModule {}
