import { Injectable, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '../prisma/prisma.service';
import { USER_TYPE } from './user.constants';
import * as process from 'process';
import { ConfigModule } from '@nestjs/config';
import userConfig from './config/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entities';
import { UserResolver } from './user.resolver';
import { GraphqlCreateUserInputController } from './dto/graphql-create-user.input/graphql-create-user.input.controller';
import { GraphqlUpdateUserInputController } from './dto/graphql-update-user.input/graphql-update-user.input';
import { PostsByUserLoader } from './data-loader/posts-by-user.loader/posts-by-user.loader';

class ConfigService {
}

class DevConfigService {
}

class ProdConfigService {
}

@Injectable()
class UserTypeFactory {
  create() {
    return ['wangjie', 'puqiulin'];
  }
}

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    ConfigModule,
    ConfigModule.forFeature(userConfig),
  ],
  providers: [
    UserService,
    PrismaService,
    UserTypeFactory,

    //use class
    {
      provide: ConfigService,
      useClass:
        process.env.NODE_ENV === 'dev' ? DevConfigService : ProdConfigService,
    },

    //use factory
    {
      provide: USER_TYPE,
      useFactory: (userTypeFactory: UserTypeFactory) =>
        userTypeFactory.create(),
      inject: [UserTypeFactory],
    },

    //use value
    { provide: USER_TYPE, useValue: ['wangjie', 'puqiulin'] },

    UserResolver,

    PostsByUserLoader,
  ],
  controllers: [UserController, GraphqlCreateUserInputController, GraphqlUpdateUserInputController],
})
export class UserModule {
}
