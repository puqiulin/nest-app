import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { TestModule } from './test/test.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import appConfig from './app.config';
import { APP_PIPE } from '@nestjs/core';
import { CommonModule } from './common/common.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { PubSubModule } from './pub-sub/pub-sub.module';

@Module({
  imports: [
    //specifying env file
    // ConfigModule.forRoot({
    //   envFilePath: '.env',
    // }),

    //for production environment
    // ConfigModule.forRoot({
    //   ignoreEnvFile: true,
    // }),

    // ConfigModule.forRoot({
    //   //validation config, especially with large configuration sets
    //   validationSchema: Joi.object({
    //     DATABASE_HOST: Joi.required(),
    //     DATABASE_PORT: Joi.number().default(5432),
    //   }),
    // }),

    //custom config file
    // ConfigModule.forRoot({
    //   load: [appConfig],
    // }),

    //validate config schema
    ConfigModule.forRoot({
      //validation config, especially with large configuration sets
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.required(),
        DATABASE_PORT: Joi.number().default(5432),
      }),
    }),
    UserModule,
    DatabaseModule,
    CommonModule,
    MongooseModule.forRoot('mongodb://localhost:27017/nest-app'),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      typePaths: ['./**/*graphql'],
      installSubscriptionHandlers: true,
    }),
    PubSubModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_PIPE, useClass: ValidationPipe }],
})
export class AppModule {
}
