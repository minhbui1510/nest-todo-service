import {CreateTagNoteDto} from "./create-tags-note.dto";
import {PartialType} from "@nestjs/swagger";

export class UpdateTagsNoteDto extends PartialType(CreateTagNoteDto) {}