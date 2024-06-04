import * as GraphQLTypes from '../../../../graphql';
import { MinLength } from 'class-validator';

export class CreateUserInput extends GraphQLTypes.CreateUserInput {
  @MinLength(3)
  name: string;
}
