import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { CustomLogger } from './logger/logger.service';
import { AllExceptionsFilter } from './filters/exeption.filter';
import { HttpAdapterHost } from '@nestjs/core';
//import { ConfigService } from '@nestjs/config';
//import { getDocs } from './utils';

const PORT: number = Number(process.env.PORT) || 4000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: false, bufferLogs: true });
  const logger = app.get(CustomLogger);
  app.useLogger(logger);
  const adapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(adapterHost, logger));

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const config = new DocumentBuilder()
    .setTitle('Home Library Service API')
    .setDescription('Documentation for nest js app')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  //const document = await getDocs('./doc/api.yaml');
  SwaggerModule.setup('doc', app, document);

  await app.listen(PORT);

  process
    .on('unhandledRejection', (reason) => {
      //console.error(reason, 'Unhandled Rejection at Promise', p);
      logger.error(reason as string, 'Unhandled Rejection at Promise');
    })
    .on('uncaughtException', (err) => {
      //console.error(err, 'Uncaught Exception thrown');
      logger.error(err.message as string, 'Unhandled Rejection at Promise');
      process.exit(1);
    });
}
bootstrap();
