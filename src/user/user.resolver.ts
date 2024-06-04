import { Args, Mutation, Query, ResolveField, Resolver, Subscription } from '@nestjs/graphql';
import { ParseIntPipe } from '@nestjs/common';
import { CreateUserInput, UpdateUserInput, User, Drink, Lover, WangJie, PuQiuLin } from '../../graphql';
import { UserService } from './user.service';
import { ResolveReplFn } from '@nestjs/core/repl/native-functions';
import { PubSub } from 'graphql-subscriptions';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService, private readonly pubSub: PubSub,
  ) {
  }

  @Query('users')
  async findAll() {
    return this.userService.graphqlFindAll();
  }

  @Query('user')
  async findOne(@Args('id', ParseIntPipe) id: number) {
    return this.userService.findByID(id);
  }

  @Mutation('createUser')
  async create(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.graphqlCreate(createUserInput);
  }

  @Mutation('updateUser')
  async update(
    @Args('id', ParseIntPipe) id: number,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return this.userService.graphqlUpdate(id, updateUserInput);
  }

  @Mutation('deleteUser')
  async delete(@Args('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }

  // query{
  //   drinks{
  //     name
  //     ... on Coffee{
  //       brand
  //     }
  //   }
  // }
  // this will return brand field when drink is coffee
  @ResolveField()
  __resolveTypeDrink(value: Drink) {
    return Object.getPrototypeOf(value).constructor.name;
  }

  @ResolveField()
  __resolveTypeLover(value: Lover) {
    if (value instanceof WangJie) {
      return 'wangjie';
    } else if (value instanceof PuQiuLin) {
      return 'puqiulin';
    }
    return null;
  }

  @Subscription()
  userAdd() {
    this.pubSub.asyncIterator('userAdd');
  }
}
