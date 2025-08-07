import {Module} from '@nestjs/common';
import {CommonModule} from "../common/common.module";
import {NotesController} from "./notes/notes.controller";
import {NotesService} from "./notes/notes.service";
import {TagsController} from './tags/tags.controller';
import {TagsService} from './tags/tags.service';
import {TagsNoteController} from "./tags-note/tags-note.controller";
import {TagsNoteService} from "./tags-note/tags-note.service";
import {UsersService} from "./users/users.service";
import {UsersController} from "./users/users.controller";
import {AuthModule} from "./auth/auth.module";

@Module({
    controllers: [NotesController, TagsController, TagsNoteController, UsersController],
    providers: [NotesService, TagsService, TagsNoteService, UsersService],
    imports: [CommonModule, AuthModule]
})
export class FeatureModule {
}
