import { HttpService } from '@nestjs/axios';
import {
  Body,
  Controller,
  Post,
  Headers,
  Res,
  BadRequestException,
  HttpStatus,
  Get,
  Query,
} from '@nestjs/common';
import { NftCollectionManagerService } from '../nft-collection-manager/nft-collection-manager.service';
import { NftCollectionMintService } from './nft-collection-mint.service';
import { NftCollectionMintDto } from './NftCollectionMint.dto';

const tonApiToken = process.env.apiToken;

@Controller('nft-collection-mint')
export class NftCollectionMintController {
  constructor(
    private readonly nftCollectionMintService: NftCollectionMintService,
    private readonly nftCollectionManagerService: NftCollectionManagerService,
    private readonly httpService: HttpService,
  ) {}

  @Post()
  async createMint(
    @Res() response,
    @Body() nftCollectionMintDto: NftCollectionMintDto,
    @Headers() headers,
  ) {
    const isTestnet = headers.testnet === 'true';
    this.checkCollectionExistanceInBlockchain(
      nftCollectionMintDto.collectionAddress,
      isTestnet,
    );

    const exiting =
      await this.nftCollectionManagerService.findByCollectionAddress(
        nftCollectionMintDto.collectionAddress,
      );

    if (!exiting) {
      throw new BadRequestException({
        message: `Collection doesn't exist to mint`,
      });
    }

    try {
      const result =
        await this.nftCollectionMintService.createNftCollectionMint(
          nftCollectionMintDto,
          isTestnet,
        );

      return response.status(HttpStatus.OK).json(result);
    } catch (error) {
      throw new BadRequestException({
        message: `Can't mint nft`,
      });
    }
  }

  @Get()
  async getMintedAmout(
    @Res() response,
    @Query() query: NftCollectionMintDto,
    @Headers() headers,
  ) {
    const isTestnet = headers.testnet === 'true';

    const result = await this.nftCollectionMintService.getAmountOfMintedItems({
      ...query,
      isTestnet,
    });

    return response.status(HttpStatus.OK).json(result);
  }

  async checkCollectionExistanceInBlockchain(
    address: string,
    isTestnet: boolean,
  ) {
    if (isTestnet) {
      return;
    }

    try {
      await this.httpService
        .request({
          url: 'https://tonapi.io/v1/nft/getCollection',
          method: 'get',
          params: {
            account: address,
          },
          headers: {
            Authorization: tonApiToken,
          },
        })
        .toPromise();
    } catch (error) {
      throw new BadRequestException({
        message: 'Could not update collection',
      });
    }
  }
}
