import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query, UsePipes, ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto/update-user.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto/pagination-query.dto';
import { Public } from '../common/decorators/public.decorator';
import { ParseIntPipe } from '../common/pipes/parse-int/parse-int.pipe';
import { Protocol } from '../common/decorators/protocol.decorator';
import { ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';

// @UsePipes(ValidationPipe)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  // @UsePipes(ValidationPipe)
  @ApiTags('user')
  @ApiForbiddenResponse({ description: 'Forbidden' }) //explicit specify additional response for swagger doc
  @Public()
  @Get()
  async getUsers(
    @Protocol('https') protocol: string,
    @Query() query: PaginationQueryDto,
  ) {
    //simulation timeout for test timeout interceptor
    // await new Promise((resolve) => setTimeout(resolve, 5000));
    console.log(`get protocol from custom protocol decorators: ${protocol}`);
    return this.userService.findAll(query);
  }

  @ApiTags('user')
  @Public()
  @Get(':id')
  getUserByID(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findByID(id);
  }

  @ApiTags('user')
  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  createUser(@Body() user: CreateUserDto) {
    //validator transform
    // console.log(user instanceof CreateUserDto);
    return this.userService.createUser(user);
  }

  @ApiTags('user')
  @Patch(':id')
  updateUser(@Param('id') id: number, @Body() user: UpdateUserDto) {
    //validator transform
    // console.log(typeof id);
    return this.userService.updateUser(id, user);
  }

  @ApiTags('user')
  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }
}
