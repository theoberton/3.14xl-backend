
import { IsBoolean, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class NftCollectionMintDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(48)
  @MinLength(48)
  readonly collectionAddress: string;
  @IsString()
  @IsNotEmpty()
  @MaxLength(48)
  @MinLength(48)
  readonly minterAddress: Object;
}

export class NftCollectionMintQuery {
  readonly collectionAddress: string;
  readonly minterAddress: Object;
  readonly isTestnet: boolean;
}