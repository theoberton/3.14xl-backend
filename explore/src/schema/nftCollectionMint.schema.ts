import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class NftCollectionMint {
  @Prop()
  minterAddress: string;
  @Prop()
  collectionAddress: string;
}

export const NftCollectionMintSchema =
  SchemaFactory.createForClass(NftCollectionMint);
