import {Module} from '@nestjs/common';
import {CommonModule} from "../common/common.module";
import {NotesController} from "./notes/notes.controller";
import {NotesService} from "./notes/notes.service";
import {TagsController} from './tags/tags.controller';
import {TagsService} from './tags/tags.service';
import {TagsNoteController} from "./tags-note/tags-note.controller";
import {TagsNoteService} from "./tags-note/tags-note.service";

@Module({
    controllers: [NotesController, TagsController, TagsNoteController],
    providers: [NotesService, TagsService, TagsNoteService],
    imports: [CommonModule]
})
export class FeatureModule {
}
