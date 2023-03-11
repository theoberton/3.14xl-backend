import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class NftCollectionMint {
  @Prop()
  minterAddress: string;
  @Prop()
  collectionAddress: string;
  @Prop()
  isTestnet: boolean;
}

export const NftCollectionMintSchema =
  SchemaFactory
    .createForClass(NftCollectionMint)
    .index({collectionAddress: 1});
