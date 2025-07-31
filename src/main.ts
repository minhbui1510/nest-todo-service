import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {Note} from "./modules/notes/entities/note.entity";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Notes API')
    .setDescription('Quản lý ghi chú cá nhân')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    // ⚠️ BẮT BUỘC nếu không sẽ lỗi 'relatedModules undefined'
  });

  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
