import { Module } from '@nestjs/common';
import { NftCollectionManagerService } from './nft-collection-manager.service';
import { NftCollectionManagerController } from './nft-collection-manager.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { NftCollectionManagerSchema } from './nft-collection-manager.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      {
        name: 'NftCollectionManager',
        schema: NftCollectionManagerSchema,
      },
    ]),
  ],
  controllers: [NftCollectionManagerController],
  providers: [NftCollectionManagerService],
})
export class NftCollectionManagerModule {}
