import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filter/http-exception/http-exception.filter';
import { WrapResponseInterceptor } from './common/interceptor/wrap-response/wrap-response.interceptor';
import { TimeoutInterceptor } from './common/interceptor/timeout/timeout.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(
    new WrapResponseInterceptor(),
    new TimeoutInterceptor(),
  );
  // use Public decorator so delete globalGuards
  // app.useGlobalGuards(new ApiKeyGuard());

  app.useGlobalPipes(
    new ValidationPipe({
      //only for legal field data
      whitelist: true,

      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        //for auto @Type(()=>Number)
        enableImplicitConversion: true,
      },
    }),
  );

  const options = new DocumentBuilder()
    .setTitle('my first nestjs swagger')
    .setDescription('this is a nestjs application')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();
