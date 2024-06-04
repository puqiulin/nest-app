import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto/create-user.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto/pagination-query.dto';
import { USER_TYPE } from './user.constants';
import { ConfigService } from '@nestjs/config';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entities';
import { Model, Connection } from 'mongoose';
import { UpdateUserInput } from './dto/update-user.input/update-user.input';
import { CreateUserInput } from './dto/create-user.input/create-user.input';
import { PubSub } from 'graphql-subscriptions';

@Injectable()
export class UserService {
  constructor(
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
    @Inject(USER_TYPE) userType: string[],
    // @Inject(userConfig.KEY)
    // private readonly userConfiguration: ConfigType<typeof userConfig>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectConnection() private readonly connection: Connection,
    private readonly pubSub: PubSub,
  ) {
    //get config from app.config
    const databaseUrl = this.configService.get<string>(
      'DATABASE_URL',
      '127.0.0.1',
    );
    console.log(`this is app config ${databaseUrl}`);

    //get config from user/config
    // const userConfig = this.configService.get('user.users');
    const userConfig = this.configService.get('user');
    console.log(`this is user config: ${userConfig}`);

    console.log(`this is inject data: ${userType}`);
  }

  async findAll(query: PaginationQueryDto) {
    const { offset, limit } = query;
    return this.prismaService.user.findMany({
      skip: offset,
      take: limit,
    });

    // return this.userModel.find().skip(offset).limit(limit).exec();
  }

  async findByID(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
    });

    // const user = await this.userModel.findOne({ _id: id }).exec();

    if (!user) {
      // throw new HttpException(`user:${id} not found`, HttpStatus.NOT_FOUND);
      throw new NotFoundException(`user:${id} not found`);
    }
    return user;
  }

  async createUser(user: CreateUserDto) {
    // const u = new this.userModel(user);
    // return u.save();
    const newUser = this.prismaService.user.create({
      data: user,
    });
    this.pubSub.publish('userAdd', { userAdd: newUser });
    return newUser;
  }

  async updateUser(id: number, user: UpdateUserDto) {
    // const existingUser = await this.userModel.findByIdAndUpdate(
    //   { _id: id },
    //   { $set: UpdateUserDto },
    //   { new: true },
    // ).exec();
    //
    // if (!existingUser) {
    //   throw new NotFoundException(`User:${id} not found`);
    // }
    //
    // return existingUser;

    return this.prismaService.user.update({
      where: {
        id: id,
      },
      data: user,
    });
  }

  async deleteUser(id: number) {
    // const user = await this.userModel.findOne({ _id: id });
    // return user.remove();

    return this.prismaService.user.delete({
      where: {
        id: id,
      },
    });
  }

  async graphqlFindAll() {
    return this.prismaService.user.findMany();
  }

  async graphqlCreate(createUserInput: CreateUserInput) {
    return this.prismaService.user.create({
      data: createUserInput,
    });
  }

  async graphqlUpdate(id: number, updateUserInput: UpdateUserInput) {
    return this.prismaService.user.update({
      where: {
        id: id,
      },
      data: updateUserInput,
    });
  }
}
