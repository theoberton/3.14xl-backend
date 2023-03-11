import { Document } from 'mongoose';

export interface INftCollectionManager extends Document {
  readonly contractAddress: string;
  readonly ownerAddress: string;
  readonly collectionAddress: string;
  readonly isTestnet: boolean;
  readonly overviewData: object;
}

export interface INftCollectionMint extends Document {
  readonly collectionAddress: string;
  readonly minterAddress: string;
  readonly isTestnet: boolean;
}
