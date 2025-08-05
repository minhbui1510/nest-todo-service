import { Module } from '@nestjs/common';
import {CommonModule} from "../common/common.module";
import {NotesController} from "./notes/notes.controller";
import {NotesService} from "./notes/notes.service";

@Module({
    controllers: [NotesController],
  providers: [NotesService],
  imports: [CommonModule]
})
export class FeatureModule {}
