import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v2');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, /* Solo las propiedades que estan en el DTO, pero tambien las demas se envian */
      forbidNonWhitelisted: true, /* Esta obliga a enviar tal cual como está definida */
      transform: true, /* Transformar la data que viaja por el DTO */
      transformOptions: {
        enableImplicitConversion: true,
      }
    })
  );

  await app.listen( process.env.PORT );
  console.log(`App running on port: ${ process.env.PORT }`);
}
bootstrap();
