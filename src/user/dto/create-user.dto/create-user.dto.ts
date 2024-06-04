import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'this is user name', example: 'wangjie' })
  @IsString()
  readonly name: string;

  @ApiProperty({
    description: 'this is user email',
    example: 'wangjie@gmail.com',
  })
  @IsString()
  readonly email: string;
}
