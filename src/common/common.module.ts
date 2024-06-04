import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ApiKeyGuard } from './guards/api-key/api-key.guard';
import { LoggingMiddleware } from './middleware/logging/logging.middleware';

@Module({
  imports: [ConfigModule],
  // providers: [{ provide: APP_GUARD, useClass: ApiKeyGuard }],
})
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    //specifying routes
    // consumer.apply(LoggingMiddleware).forRoutes({ path: 'user', method: RequestMethod.GET });

    //exclude routes
    // consumer.apply(LoggingMiddleware).exclude('user').forRoutes('*');

    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
