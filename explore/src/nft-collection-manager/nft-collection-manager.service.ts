import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { INftCollectionManager } from 'src/interface/nftCollectionManager.interface';
import { CreateNftCollectionManagerDto } from 'src/dto/createNftCollectionManager.dto';
import { UpdateNftCollectionManagerDto } from 'src/dto/updateNftCollectionManager.dto';

@Injectable()
export class NftCollectionManagerService {
  constructor(
    @InjectModel('NftCollectionManager')
    private nftCollectionManagerModel: Model<INftCollectionManager>,
  ) {}

  async createNftCollectionManager(
    createNftCollectionManagerDto: CreateNftCollectionManagerDto,
    isTestnet: boolean,
  ): Promise<INftCollectionManager> {
    const newNftCollectionManager = new this.nftCollectionManagerModel(
      {
        ...createNftCollectionManagerDto,
        isTestnet
      },
    );
    return newNftCollectionManager.save();
  }

  async updateByNftCollectionManagerAddress(
    contractAddress: string,
    nftCollectionManagerDto: UpdateNftCollectionManagerDto,
    isTestnet: boolean,
  ): Promise<INftCollectionManager> {
    const newNftCollectionManager =
      await this.nftCollectionManagerModel.updateOne(
        {
          contractAddress,
          isTestnet,
        },
        { $set: nftCollectionManagerDto },
      );

      const updated = this.findByCollectionManagerAddress(contractAddress, isTestnet);

      return updated;
  }

  async findByCollectionManagerAddress(address: string, isTestnet: boolean) {
    const existingManagerContract =
      await this.nftCollectionManagerModel.findOne({
        contractAddress: address,
        isTestnet,
      });


    return existingManagerContract;
  }

  async findByOwnerAddress(
    ownerAddress: string,
  ): Promise<(INftCollectionManager & { _id: ObjectId })[]> {
    const existingManagerContractsByOwner =
      await this.nftCollectionManagerModel.find({ ownerAddress });

    return existingManagerContractsByOwner;
  }

  async findByCollectionAddress(
    collectionAddress: string,
  ): Promise<INftCollectionManager & { _id: ObjectId }> {
    const existingManagerContractsByOwner =
      await this.nftCollectionManagerModel.findOne({ collectionAddress });

    return existingManagerContractsByOwner;
  }

  async findAll(query, skip = 0, limit: number) {
    const result = await this.nftCollectionManagerModel
      .find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    const countOfDocs = await this.nftCollectionManagerModel.count(query);

    return {
      result,
      count: countOfDocs,
    };
  }
}
