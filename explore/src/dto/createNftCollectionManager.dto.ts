import { IsNotEmpty, MaxLength, IsString, MinLength } from 'class-validator';

export class CreateNftCollectionManagerDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(48)
  @MinLength(48)
  readonly contractAddress: string;
  @IsString()
  @IsNotEmpty()
  @MaxLength(48)
  @MinLength(48)
  readonly ownerAddress: string;
  @IsString()
  @IsNotEmpty()
  @MaxLength(48)
  @MinLength(48)
  readonly collectionAddress: string;
  // TO DO add validation
  readonly overviewData: Object;
}
