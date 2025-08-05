import { ApiProperty } from '@nestjs/swagger';

export class TagNote {
  @ApiProperty()
  tagId: number;

  @ApiProperty()
  noteId: number;

  @ApiProperty()
  createdAt: Date;
}
