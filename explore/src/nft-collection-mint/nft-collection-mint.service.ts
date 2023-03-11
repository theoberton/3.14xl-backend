import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  INftCollectionMint,
} from 'src/interface/nftCollectionManager.interface';
import { NftCollectionMint } from 'src/schema/nftCollectionMint.schema';
import { NftCollectionMintDto, NftCollectionMintQuery } from './NftCollectionMint.dto';

@Injectable()
export class NftCollectionMintService {
  constructor(
    @InjectModel('NftCollectionMint')
    private nftCollectionMintModel: Model<INftCollectionMint>,
  ){};

  async createNftCollectionMint(
    nftCollectionMintDto: NftCollectionMintDto,
    isTestnet: boolean,
  ): Promise<NftCollectionMint> {
    const newNftCollectionMint = new this.nftCollectionMintModel(
      {
        ...nftCollectionMintDto,
        isTestnet
      },
    );
    return newNftCollectionMint.save();
  }

  async getAmountOfMintedItems(query: NftCollectionMintQuery) {
    const result = await this.nftCollectionMintModel.countDocuments(query);

    return result;
  }
}
