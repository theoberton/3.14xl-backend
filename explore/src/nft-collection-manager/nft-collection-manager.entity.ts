import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import Document from 'mongoose';

export type NftCollectionManagerDocument = NftCollectionManager & Document;

@Schema({})
export class OverviewData {
  @Prop()
  content: string;
  @Prop()
  limit: number;
  @Prop()
  name: string;
  @Prop()
  owner: string;
  @Prop()
  nextItemIndex: number;
  @Prop()
  price: string
  @Prop()
  collectionAddress: string
  @Prop()
  dateEnd: number
  @Prop()
  dateStart: number
  @Prop()
  maxSupply: string;
  @Prop()
  payoutAddress: string;
}
export const OverviewSchema = SchemaFactory.createForClass(OverviewData);

@Schema({ timestamps: true })
export class NftCollectionManager {
  @Prop()
  contractAddress: string;
  @Prop()
  ownerAddress: string;
  @Prop()
  collectionAddress: string;
  @Prop()
  isTestnet: boolean
  @Prop({type: OverviewSchema})
  overviewData: object;
}

export const NftCollectionManagerSchema =
  SchemaFactory.createForClass(NftCollectionManager);
