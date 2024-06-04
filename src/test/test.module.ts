import { Injectable, Module, Scope } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import * as process from 'process';
import { ConfigModule } from '@nestjs/config';

//Scope.DEFAULT are a singleton(instantiate once)
//Scope.TRANSIENT instantiate once for every provider
//Scope.REQUEST instantiate once for every new request
@Injectable({ scope: Scope.DEFAULT })
@Module({
  //use dynamic module
  imports: [
    DatabaseModule.register({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      password: process.env.DATABASE_PASSWORD,
      port: +process.env.DATABASE_PORT,
    }),
  ],
})
export class TestModule {
}
