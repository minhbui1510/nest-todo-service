import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import {RequestContextModule} from "../../common/context/request-context/request-context.module";

@Module({
  controllers: [NotesController],
  providers: [NotesService],
  imports: [RequestContextModule]
})
export class NotesModule {}
