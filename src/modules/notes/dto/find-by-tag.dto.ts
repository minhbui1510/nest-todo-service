import {ApiProperty} from "@nestjs/swagger";
import {IsString} from "class-validator";

export class FindByTagDto {
    @ApiProperty({ example: 'Tag 1' })
    @IsString()
    tagName: string; // Tên tag để tìm kiếm
}