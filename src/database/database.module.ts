import { DynamicModule, Module } from '@nestjs/common';
import { ConnectionOptions, createConnection } from 'typeorm';

//dynamic module
@Module({})
export class DatabaseModule {
  static register(options: ConnectionOptions): DynamicModule {
    return {
      module: DatabaseModule,
      providers: [
        {
          provide: 'CONNECTION',
          useValue: createConnection(options),
        },
      ],
    };
  }
}
