import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from './common/filter/http.filter';
import { RequestIdInterceptor } from './common/interceptor/request-id.interceptor';
import { RequestContextService } from './common/context/request-context.service';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { TrimPipe } from './common/pipe/trim.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const requestContext = app.get(RequestContextService);

  // ✅ Swagger setup
  const swaggerConfig = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('Demo Swagger + API Key')
    .setVersion('1.0')
    .addBearerAuth() // 👈 Nếu dùng JWT, thêm vào
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  // ✅ Global Filters (SỬA LỖI NGOẶC TẠI ĐÂY)
  app.useGlobalFilters(
    new HttpExceptionFilter(requestContext),
  );

  // ✅ Global Interceptors
  app.useGlobalInterceptors(
    new RequestIdInterceptor(requestContext),
  );

  // ✅ Global Pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) => {
        const result = {};
        errors.forEach((error) => {
          if (error.constraints) {
            result[error.property] = Object.values(error.constraints);
          }
        });

        return new BadRequestException({
          errors: result,
          requestId: requestContext.getRequestId(),
        });
      },
    }),
    new TrimPipe()
  );

  app.enableCors("*"); // bạn có thể truyền options thay vì "*"
  await app.listen(3000);
}

bootstrap();
