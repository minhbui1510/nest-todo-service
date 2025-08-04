import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import {ConfigService} from '@nestjs/config';
import {HttpExceptionFilter} from "./common/http/http.filter";
import {PrismaExceptionFilter} from "./common/prisma-exception/prisma-exception.filter";
import {RequestIdInterceptor} from "./common/interceptor/request-id.interceptor";
import {RequestContextService} from "./common/context/request-context/request-context.service";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const configService = app.get(ConfigService);
    const apiKey = configService.get<string>('API_KEY');

    console.log('🔑 Loaded API_KEY:', apiKey);

    const config = new DocumentBuilder()
        .setTitle('My API')
        .setDescription('Demo Swagger + API Key')
        .setVersion('1.0')
        .addApiKey({type: 'apiKey', name: 'x-api-key', in: 'header'}, 'x-api-key')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    app.useGlobalFilters(
        new HttpExceptionFilter(app.get(RequestContextService)),
        new PrismaExceptionFilter(app.get(RequestContextService)));
    app.useGlobalInterceptors(
        new RequestIdInterceptor(app.get(RequestContextService)),
    );
    await app.listen(3000);
}

bootstrap();
