import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class NftCollectionManager {
  @Prop()
  contractAddress: string;
  @Prop()
  ownerAddress: string;
  @Prop()
  collectionAddress: string;
}

export const NftCollectionManagerSchema =
  SchemaFactory.createForClass(NftCollectionManager);
