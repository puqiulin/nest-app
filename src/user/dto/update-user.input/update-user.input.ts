import * as GraphQLTypes from '../../../../graphql';
import { IsOptional, MinLength } from 'class-validator';

export class UpdateUserInput extends GraphQLTypes.UpdateUserInput {
  @IsOptional()
  @MinLength(3)
  name: string;
}
