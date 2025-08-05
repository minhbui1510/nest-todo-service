import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import {ConfigService} from '@nestjs/config';
import {HttpExceptionFilter} from "./common/filter/http.filter";
import {PrismaExceptionFilter} from "./common/filter/prisma-exception.filter";
import {RequestIdInterceptor} from "./common/interceptor/request-id.interceptor";
import {RequestContextService} from "./common/context/request-context.service";
import {BadRequestException, ValidationPipe} from "@nestjs/common";
import {TrimPipe} from "./common/pipe/trim.pipe";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const configService = app.get(ConfigService);
    const apiKey = configService.get<string>('API_KEY');

    const config = new DocumentBuilder()
        .setTitle('My API')
        .setDescription('Demo Swagger + API Key')
        .setVersion('1.0')
        .addApiKey({type: 'apiKey', name: 'x-api-key', in: 'header'}, 'x-api-key')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    app.useGlobalFilters(
        new PrismaExceptionFilter(app.get(RequestContextService))),
        new HttpExceptionFilter(app.get(RequestContextService));
    app.useGlobalInterceptors(
        new RequestIdInterceptor(app.get(RequestContextService)),
    );
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
                    requestId: app.get(RequestContextService).getRequestId(),
                });
            },
        }),
        new TrimPipe()
    );

    app.enableCors("*")
    await app.listen(3000);
}

bootstrap();
