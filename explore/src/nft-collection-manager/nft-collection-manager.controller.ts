import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  Query,
  Get,
  Headers,
  Put,
  Param,
  BadRequestException,
} from '@nestjs/common';
import { NftCollectionManagerService } from 'src/nft-collection-manager/nft-collection-manager.service';
import { CreateNftCollectionManagerDto } from 'src/dto/createNftCollectionManager.dto';

import { ManagerQueryParams } from './nft-collection-manager.dto';
import { HttpService } from '@nestjs/axios';
import { UpdateNftCollectionManagerDto } from 'src/dto/updateNftCollectionManager.dto';

const tonApiToken =
  'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsia29seWFuOTgiXSwiZXhwIjoxODM1NzEzODg4LCJpc3MiOiJAdG9uYXBpX2JvdCIsImp0aSI6IjVXR0xRQkhNVjZLV0VSQUJORlZUWUtISyIsInNjb3BlIjoic2VydmVyIiwic3ViIjoidG9uYXBpIn0.09owShXOZOQCQFfwqb12y3At-8fLB53zOFg5dfX-YeiuVbM-M-3wgwHifK6rY6AlSWC_P4GYppy7bycv4lQ2AQ';

@Controller('nft-collection-manager')
export class NftCollectionManagerController {
  constructor(
    private readonly nftCollectionManagerService: NftCollectionManagerService,
    private readonly httpService: HttpService,
  ) {}

  @Post()
  async createNftCollectionManagerContract(
    @Res() response,
    @Body() createNftCollectionManagerDto: CreateNftCollectionManagerDto,
    @Headers() headers,
  ) {
    const isTestnet = headers.testnet === "true";
    this.checkCollectionExistanceInBlockchain(createNftCollectionManagerDto.collectionAddress, isTestnet);

    const exiting =
      await this.nftCollectionManagerService.findByCollectionAddress(
        createNftCollectionManagerDto.collectionAddress,
      );

    if (exiting) {
      return response.status(HttpStatus.CREATED).json(exiting);
    }

    try {
      const newNftCollectionManager =
        await this.nftCollectionManagerService.createNftCollectionManager(
          createNftCollectionManagerDto,
          isTestnet,
        );

      return response.status(HttpStatus.CREATED).json(newNftCollectionManager);
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error nft collection manager has not been created',
        error: 'Bad request',
      });
    }
  }

  @Put('/:address')
  async updateNftCollectionManagerContract(
    @Res() response,
    @Param('address') address,
    @Body() updateNftCollectionManagerDto: UpdateNftCollectionManagerDto,
    @Headers() headers,
  ) {
    const isTestnet = headers.testnet === "true";

    const existing =
      await this.nftCollectionManagerService.findByCollectionManagerAddress(
        address,
        isTestnet
      );

    if (!existing) {
      throw new BadRequestException({
        message: 'Could not find collection',
      });
    }    

    try {
      const updateNftCollectionManager =
        await this.nftCollectionManagerService.updateByNftCollectionManagerAddress(
          address,
          updateNftCollectionManagerDto,
          isTestnet
        );

      return response.status(HttpStatus.OK).json(updateNftCollectionManager);
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: `Error nft collection manager can't be updated`,
        error: 'Bad request',
      });
    }
  }

  @Get('/')
  async getAll(
    @Headers() headers,
    @Query() { skip, limit = 20, ownerAddress }: ManagerQueryParams,
  ) {
    const isTestnet = headers.testnet === "true";

    const baseQuery: any = { isTestnet };

    if (ownerAddress) {
      baseQuery.ownerAddress = ownerAddress;
    }

    const result = await this.nftCollectionManagerService.findAll(
      baseQuery,
      skip,
      limit,
    );

    return result;
  }

  async checkExistance(address: string, isTestnet: boolean) {
    const existing =
      await this.nftCollectionManagerService.findByCollectionManagerAddress(
        address,
        isTestnet
      );

    if (!existing) {
      throw new BadRequestException({
        message: 'Could not find collection',
        error: 'Bad request',
      });
    }
  }

  async checkCollectionExistanceInBlockchain(address: string, isTestnet: boolean) {
    if(isTestnet) {
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
