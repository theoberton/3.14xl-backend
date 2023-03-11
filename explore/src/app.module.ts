import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NftCollectionManagerModule } from './nft-collection-manager/nft-collection-manager.module';
import { NftCollectionMintModule } from './nft-collection-mint/nft-collection-mint.module';
import * as Joi from '@hapi/joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        MONGO_USERNAME: Joi.string().required(),
        MONGO_PASSWORD: Joi.string().required(),
        MONGO_DATABASE: Joi.string().required(),
        MONGO_HOST: Joi.string().required(),
        MONGO_PORT: Joi.string().required(),
      }),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const username = configService.get('MONGO_USERNAME');
        console.log('username', username);
        const password = configService.get('MONGO_PASSWORD');
        console.log('password', password);
        const database = configService.get('MONGO_DATABASE');
        const host = configService.get('MONGO_HOST');
        console.log('host', host);
        const port = configService.get('MONGO_PORT');
        console.log(
          'portffffff',
          `mongodb://${username}:${password}@${host}:${port}`,
        );

        return {
          uri: `mongodb://${username}:${password}@${host}:${port}`,
          dbName: database,
        };
      },
      inject: [ConfigService],
    }),
    NftCollectionManagerModule,
    NftCollectionMintModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
